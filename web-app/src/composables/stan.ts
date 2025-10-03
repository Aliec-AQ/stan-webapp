import axios from "axios";
import type { Ligne, Arret, Passage } from "@/types";

export class Stan {
  // Constants
  static CACHE_DURATION = 14 * 24 * 60 * 60 * 1000; // 2 semaines en millisecondes
  
  static plans: { [key: string]: string } | null = null;

  // HTTP client
  static getInstance() {
    return axios.create({
      baseURL: 'https://www.reseau-stan.com/?type=476',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    });
  }

  // Cache management methods
  static saveToCache(key: string, data: any) {
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
  
  static getFromCache(key: string) {
    try {
      const cacheItem = localStorage.getItem(key);
      if (!cacheItem) return null;
      
      const { timestamp, data } = JSON.parse(cacheItem);
      
      return Date.now() - timestamp < this.CACHE_DURATION ? data : null;
    } catch (error) {
      console.error('Error reading from cache:', error);
      return null;
    }
  }
  
  static clearCache() {
    try {
      localStorage.removeItem('stan_lignes');
      
      Object.keys(localStorage)
        .filter(key => key.startsWith('stan_arrets_'))
        .forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  }
  
  // Data fetch methods
  static async getLignes(forceRefresh = false): Promise<Ligne[]> {
    // Try to get from cache unless refresh is forced
    if (!forceRefresh) {
      const cachedLignes = this.getFromCache('stan_lignes');
      if (cachedLignes) return cachedLignes;
    }
    
    // Fetch from API
    const response = await Stan.getInstance().get('https://www.reseau-stan.com/');
    const htmlContent = response.data;
    
    // Parse lines data using regex
    const ligneRegex = /data-ligne="(\d+)" data-numlignepublic="([^"]+)" data-osmid="(line[^"+]+)" data-libelle="([^"]+)" value="[^"]+">/g;
    const lignes: Ligne[] = [];
    
    for (const match of htmlContent.matchAll(ligneRegex)) {
      const [_, id, numPublic, osmId, rawLibelle] = match;
      
      lignes.push({
        id: parseInt(id),
        numlignepublic: numPublic,
        osmid: osmId,
        libelle: this._decodeHtmlEntities(rawLibelle),
        image: `https://www.reseau-stan.com/typo3conf/ext/kg_package/Resources/Public/images/pictolignes/${numPublic.replace(' ','_')}.png`
      });
    }
    
    // Save to cache
    this.saveToCache('stan_lignes', lignes);
    
    return lignes;
  }

  static async getLigne(osmid: string, forceRefresh = false): Promise<Ligne | null> {
    const lignes = await this.getLignes(forceRefresh);
    return lignes.find(ligne => ligne.osmid === osmid) || null;
  }

  static async getArrets(ligne: Ligne, forceRefresh = false): Promise<Arret[]> {
    // Try to get from cache unless refresh is forced
    const cacheKey = `stan_arrets_${ligne.id}`;
    if (!forceRefresh) {
      const cachedArrets = this.getFromCache(cacheKey);
      if (cachedArrets) return cachedArrets;
    }
    
    // Prepare form data for request
    const formData = new FormData();
    formData.append('requete', 'tempsreel_arrets');
    formData.append('requete_val[ligne]', ligne.id.toString());
    formData.append('requete_val[numlignepublic]', ligne.numlignepublic);
    
    // Make request
    const response = await this.getInstance().request({
      method: 'POST',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    
    // Parse stops data using regex
    const arretRegex = /data-libelle="([^"]+)" data-ligne="(\d+)" data-numlignepublic="([^"]+)" value="([^"]+)">([^<]+)<\/option>/g;
    const arrets: Arret[] = [];
    
    for (const match of response.data.matchAll(arretRegex)) {
      const [_, libelle, , , osmid] = match;
      
      arrets.push({
        ligne,
        libelle,
        osmid
      });
    }
    
    // Save to cache
    this.saveToCache(cacheKey, arrets);
    
    return arrets;
  }

  static async getProchainsPassages(arret: Arret): Promise<Passage[]> {
    // Prepare form data for request
    const formData = new FormData();
    formData.append('requete', 'tempsreel_submit');
    formData.append('requete_val[arret]', arret.osmid);
    formData.append('requete_val[ligne_omsid]', arret.ligne?.osmid || '');
    
    // Make request
    const response = await this.getInstance().request({
      method: 'POST',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    
    // Split response by list items
    const passageItems = response.data.split('<li>').slice(1);
    const passages: Passage[] = [];
    
    // Process each passage item
    for (const item of passageItems) {
      // Extract direction and line information
      const directionMatch = item.match(/<span>([^"]+)<\/span><\/span>/);
      const ligneMatch = item.match(/<span id="ui-ligne-(\d+)".*\/pictolignes\/([^"]+).png'/);
      
      if (!directionMatch || !ligneMatch) continue;
      
      const direction = directionMatch[1];
      
      // Create base passage object with required properties
      const basePassage: Passage = {
        arret: { 
          ...arret 
        },
        direction,
        temps_min: 0,
        temps_theorique: false
      };
      
      // Process "now" passages
      this._processNowPassages(item, basePassage, passages);
      
      // Process "X min" passages
      this._processMinutePassages(item, basePassage, passages);
      
      // Process "HH:MM" passages
      this._processHourPassages(item, basePassage, passages);
    }
    
    return passages;
  }

  static async loadPlans(): Promise<void> {
    if (this.plans) return; // Avoid reloading if already loaded
    try {
      const response = await axios.get('/stan-webapp/plans.json');
      this.plans = response.data;
    } catch (error) {
      console.error('Error loading plans:', error);
    }
  }

  static async getPlan(ligne: Ligne): Promise<string | null> {
    if (!this.plans) await this.loadPlans();
    return ligne?.osmid ? this.plans?.[ligne.osmid] || null : null;
  }
  
  // Helper methods
  static _decodeHtmlEntities(text: string): string {
    return text
      .replace('&lt;', '<')
      .replace('&gt;', '>')
      .replace(/&#039;/g, "'");
  }

  static _processNowPassages(html: string, basePassage: Passage, passages: Passage[]) {
    const nowRegex = /class="tpsreel-temps-item large-1 "><i class="icon-car1"><\/i><i title="Temps Réel" class="icon-wifi2"><\/i>/g;
    
    for (const _ of html.matchAll(nowRegex)) {
      passages.push({
        ...basePassage,
        temps_min: 0,
        temps_theorique: false
      });
    }
  }

  static _processMinutePassages(html: string, basePassage: Passage, passages: Passage[]) {
    const minutesRegex = /class="tpsreel-temps-item large-1 ">(\d+) min/g;
    
    for (const match of html.matchAll(minutesRegex)) {
      passages.push({
        ...basePassage,
        temps_min: parseInt(match[1]),
        temps_theorique: false
      });
    }
  }

  static _processHourPassages(html: string, basePassage: Passage, passages: Passage[]) {
    const hoursRegex = /temps-item-heure">(\d+)h(\d+)(.*)<\/a>/g;
    
    for (const match of html.matchAll(hoursRegex)) {
      const hours = parseInt(match[1]);
      const minutes = parseInt(match[2]);
      
      passages.push({
        ...basePassage,
        temps_min: hours * 60 + minutes,
        temps_theorique: match[0].includes('tpsreel-temps-item-tpstheorique')
      });
    }
  }
}