import { ref } from "vue";
import axios from "axios";

export class Stan {
  
  static CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 heures en millisecondes
  
  static saveToCache(key, data) {
    try {
      const cacheItem = {
        timestamp: Date.now(),
        data: data
      };
      localStorage.setItem(key, JSON.stringify(cacheItem));
    } catch (error) {
      console.error('Error saving to cache:', error);
    }
  }
  
  static getFromCache(key) {
    try {
      const cacheItem = localStorage.getItem(key);
      if (!cacheItem) return null;
      
      const { timestamp, data } = JSON.parse(cacheItem);
      
      // Vérifier si les données en cache sont encore valides
      if (Date.now() - timestamp < this.CACHE_DURATION) {
        return data;
      }
      return null;
    } catch (error) {
      console.error('Error reading from cache:', error);
      return null;
    }
  }
  
  static clearCache() {
    try {
      localStorage.removeItem('stan_lignes');
      localStorage.removeItem('stan_arrets');
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  }
  
  static async getLignes(forceRefresh = false) {
    // Essayer d'obtenir les lignes depuis le cache si on ne force pas le rafraîchissement
    if (!forceRefresh) {
      const cachedLignes = this.getFromCache('stan_lignes');
      if (cachedLignes) {
        return cachedLignes;
      }
    }
    
    // Si pas en cache ou refresh forcé, faire l'appel API
    const rep = (await Stan.getInstance().get('https://www.reseau-stan.com/')).data;
    const regex = /data-ligne="(\d+)" data-numlignepublic="([^"]+)" data-osmid="(line[^"+]+)" data-libelle="([^"]+)" value="[^"]+">/g;
    const lignes = [];
    
    const matches = rep.matchAll(regex);
    for (const rawLigne of matches) {
      lignes.push({
        id: parseInt(rawLigne[1]),
        numlignepublic: rawLigne[2],
        osmid: rawLigne[3],
        libelle: rawLigne[4].replace('&lt;', '<').replace('&gt;', '>').replace(/&#039;/g, "'"),
        image: `https://www.reseau-stan.com/typo3conf/ext/kg_package/Resources/Public/images/pictolignes/${rawLigne[2].replace(' ','_')}.png`
      });
    }
    
    // Sauvegarder les données dans le cache
    this.saveToCache('stan_lignes', lignes);
    
    return lignes;
  }

  static async getLigne(osmid, forceRefresh = false) {
    const lignes = await Stan.getLignes(forceRefresh);
    return lignes.find(l => l.osmid == osmid) || null;
  }

  static async getArrets(ligne, forceRefresh = false) {
    // Essayer d'obtenir les arrêts depuis le cache si on ne force pas le rafraîchissement
    const cacheKey = `stan_arrets_${ligne.id}`;
    if (!forceRefresh) {
      const cachedArrets = this.getFromCache(cacheKey);
      if (cachedArrets) {
        return cachedArrets;
      }
    }
    
    const formData = new FormData();
    formData.append('requete', 'tempsreel_arrets');
    formData.append('requete_val[ligne]', ligne.id);
    formData.append('requete_val[numlignepublic]', ligne.numlignepublic);
    
    const rep = (await Stan.getInstance().request({
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })).data;
    
    const regex = /data-libelle="([^"]+)" data-ligne="(\d+)" data-numlignepublic="([^"]+)" value="([^"]+)">([^<]+)<\/option>/g;
    const arrets = [];
    
    const matches = rep.matchAll(regex);
    for (const rawArret of matches) {
      arrets.push({
        ligne,
        libelle: rawArret[1],
        osmid: rawArret[4]
      });
    }
    
    // Sauvegarder dans le cache
    this.saveToCache(cacheKey, arrets);
    
    return arrets;
  }

  static async getProchainsPassages(arret) {
    // On ne met pas en cache les prochains passages car ils changent constamment
    const formData = new FormData();
    formData.append('requete', 'tempsreel_submit');
    formData.append('requete_val[arret]', arret.osmid);
    formData.append('requete_val[ligne_omsid]', arret.ligne?.osmid || '');
    
    const rep = (await Stan.getInstance().request({
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })).data.split('<li>').slice(1)
    
    const passages = []

    for (const rawPassageLi of rep) {
      const directionMatch = rawPassageLi.match(/<span>([^"]+)<\/span><\/span>/);
      const ligneMatch = rawPassageLi.match(/<span id="ui-ligne-(\d+)".*\/pictolignes\/([^"]+).png'/);
      
      if (!directionMatch || !ligneMatch) continue;
      
      const direction = directionMatch[1];
      const ligneId = parseInt(ligneMatch[1], 10);
      const ligneNumPublic = ligneMatch[2];
      
      // Process "now" passages
      const regexPassagesNow = /class="tpsreel-temps-item large-1 "><i class="icon-car1"><\/i><i title="Temps Réel" class="icon-wifi2"><\/i>/g;
      const nowMatches = [...rawPassageLi.matchAll(regexPassagesNow)];
      for (const _ of nowMatches) {
        passages.push({
          arret: { ligne: { ...arret.ligne, id: ligneId, numlignepublic: ligneNumPublic }, ...arret },
          direction: direction,
          temps_min: 0,
          temps_theorique: false
        });
      }
      
      // Process "X min" passages
      const regexPassagesMin = /class="tpsreel-temps-item large-1 ">(\d+) min/g;
      const minMatches = [...rawPassageLi.matchAll(regexPassagesMin)];
      for (const minMatch of minMatches) {
        passages.push({
          arret: { ligne: { ...arret.ligne, id: ligneId, numlignepublic: ligneNumPublic }, ...arret },
          direction: direction,
          temps_min: parseInt(minMatch[1]),
          temps_theorique: false
        });
      }
      
      // Process "HH:MM" passages
      const regexPassagesH = /temps-item-heure">(\d+)h(\d+)(.*)<\/a>/g;
      const hourMatches = [...rawPassageLi.matchAll(regexPassagesH)];
      for (const hourMatch of hourMatches) {
        passages.push({
          arret: { ligne: { ...arret.ligne, id: ligneId, numlignepublic: ligneNumPublic }, ...arret },
          direction: direction,
          temps_min: parseInt(hourMatch[1]) * 60 + parseInt(hourMatch[2]),
          temps_theorique: hourMatch[0].includes('tpsreel-temps-item-tpstheorique')
        });
      }
    }
    return passages
  }
  
  static getInstance() {
    return axios.create({
      baseURL: 'https://www.reseau-stan.com/?type=476',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    });
  }
}