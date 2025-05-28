import axios from "axios";

export class Stan {
  
  static CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 heures en millisecondes
  
  static plans = {
    "line:GST:1-97" : "https://tim.reseau-stan.com/tim/data/pdf/2283_Ligne Tempo 1.pdf",
    "line:GST:2-97" : "https://tim.reseau-stan.com/tim/data/pdf/1372_Ligne Tempo 2.pdf",
    "line:GST:3-97" : "https://tim.reseau-stan.com/tim/data/pdf/2312_Ligne Tempo 3.pdf",
    "line:GST:4-97" : "https://tim.reseau-stan.com/tim/data/pdf/2215_Ligne Tempo 4.pdf",
    "line:GST:5-97" : "https://tim.reseau-stan.com/tim/data/pdf/2216_Ligne Corol.pdf",
    "line:GST:18-97": "https://tim.reseau-stan.com/tim/data/pdf/2219_Brabois Express.pdf",
    "line:GST:14-97": "https://tim.reseau-stan.com/tim/data/pdf/1315_Ligne 14ex-14sept23.pdf",
    "line:SUB:10": "https://tim.reseau-stan.com/tim/data/pdf/2217_Ligne 10.pdf",
    "line:GST:11-97": "https://tim.reseau-stan.com/tim/data/pdf/2218_Ligne 11.pdf",
    "line:GST:12-97": "https://tim.reseau-stan.com/tim/data/pdf/2109_Ligne 12.pdf",
    "line:GST:13-97": "https://tim.reseau-stan.com/tim/data/pdf/1868_Ligne 13.pdf",
    "line:GST:15-97": "https://tim.reseau-stan.com/tim/data/pdf/2309_Ligne 15.pdf",
    "line:GST:16-97": "https://tim.reseau-stan.com/tim/data/pdf/2310_Ligne 16.pdf",
    "line:GST:17-97": "https://tim.reseau-stan.com/tim/data/pdf/2112_Ligne 17.pdf",
    "ine:GST:20-97": "https://tim.reseau-stan.com/tim/data/pdf/2113_Ligne 20.pdf",
    "line:GST:21-97": "https://tim.reseau-stan.com/tim/data/pdf/2118_Ligne 21.pdf",
    "line:GST:22-97": "https://tim.reseau-stan.com/tim/data/pdf/1321_Ligne 22.pdf",
    "line:SUB:23": "https://tim.reseau-stan.com/tim/data/pdf/2115_Ligne 23.pdf",
    "line:SUB:24": "https://tim.reseau-stan.com/tim/data/pdf/1323_Ligne 24.pdf",
    "line:GST:30-97": "https://tim.reseau-stan.com/tim/data/pdf/1324_Ligne 30.pdf",
    "line:GST:31-97": "https://tim.reseau-stan.com/tim/data/pdf/1870_Ligne 31.pdf",
    "line:GST:32-97": "https://tim.reseau-stan.com/tim/data/pdf/1327_Plan -ligne 32-sept 23.pdf",
    "line:GST:33-97": "https://tim.reseau-stan.com/tim/data/pdf/2116_Ligne 33.pdf",
    "line:GST:50-97": "https://tim.reseau-stan.com/tim/data/pdf/2119_Ligne 50.pdf",
    "line:GST:51-97": "https://tim.reseau-stan.com/tim/data/pdf/2027_Ligne 51.pdf",
    "line:GST:52-97": "https://tim.reseau-stan.com/tim/data/pdf/2120_Ligne 52.pdf",
    "line:GST:53-97": "https://tim.reseau-stan.com/tim/data/pdf/2028_Ligne 53.pdf",
    "line:GST:54-97": "https://tim.reseau-stan.com/tim/data/pdf/2121_Ligne 54.pdf",
    "line:GST:55-97": "https://tim.reseau-stan.com/tim/data/pdf/1640_Plan -55 - 2 oct 23.pdf",
    "line:GST:56-97": "https://tim.reseau-stan.com/tim/data/pdf/1333_Ligne 56.pdf",
    "line:GST:57-97": "https://tim.reseau-stan.com/tim/data/pdf/2023_Ligne 57.pdf",
    "line:GST:58-97": "https://tim.reseau-stan.com/tim/data/pdf/2029_Ligne 58.pdf",
    "line:GST:59-97": "https://tim.reseau-stan.com/tim/data/pdf/2122_Ligne 59.pdf",
    "line:GST:60-97": "https://tim.reseau-stan.com/tim/data/pdf/1388_Ligne 60-V2.pdf",
    "line:GST:61-97": "https://tim.reseau-stan.com/tim/data/pdf/2123_Ligne 61.pdf",
    "line:GST:62-97": "https://tim.reseau-stan.com/tim/data/pdf/2124_Ligne 62 - 02.09",
    "line:GST:63-97": "https://tim.reseau-stan.com/tim/data/pdf/2125_Ligne 63.pdf",
    "line:GST:64-97": "https://tim.reseau-stan.com/tim/data/pdf/2126_Ligne 64.pdf",
    "line:GST:65-97": "https://tim.reseau-stan.com/tim/data/pdf/2026_Ligne 65.pdf",
    "line:GST:66-97": "https://tim.reseau-stan.com/tim/data/pdf/2127_Ligne 66.pdf",
    "line:GST:67-97": "https://tim.reseau-stan.com/tim/data/pdf/2128_Ligne 67.pdf",
    "line:GST:41-97": "https://tim.reseau-stan.com/tim/data/pdf/2299_Citadine Nancy.pdf",
    "line:GST:42-97": "https://tim.reseau-stan.com/tim/data/pdf/1484_Citadine Vandoeuvre.pdf",
  }

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

  static getPlan(ligne) {
    if (!ligne || !ligne.osmid) return null;
    
    const planUrl = this.plans[ligne.osmid];
    if (!planUrl) return null;
    
    return planUrl;
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