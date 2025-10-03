import axios from "axios";
import type { Ligne, Arret, Passage } from "@/types";

export class Stan {
  // Constants
  static CACHE_DURATION = 14 * 24 * 60 * 60 * 1000; // 2 semaines en millisecondes
  
  static plans: { [key: string]: string } = {
    "line:GST:1-97" : "https://tim.reseau-stan.com/tim/data/pdf/2283_Ligne Tempo 1.pdf",
    "line:GST:2-97" : "https://tim.reseau-stan.com/tim/data/pdf/1372_Ligne Tempo 2.pdf",
    "line:GST:3-97" : "https://tim.reseau-stan.com/tim/data/pdf/2312_Ligne Tempo 3.pdf",
    "line:GST:4-97" : "https://tim.reseau-stan.com/tim/data/pdf/2215_Ligne Tempo 4.pdf",
    "line:GST:5-97" : "https://tim.reseau-stan.com/tim/data/pdf/2460_Tempo 5_2025.pdf",
    "line:GST:7": "https://tim.reseau-stan.com/tim/data/pdf/2216_Ligne Corol.pdf",
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
    console.log(lignes);
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
    

    console.log(arrets);
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

  static getPlan(ligne: Ligne): string | null {
    if (!ligne || !ligne.osmid) return null;
    return this.plans[ligne.osmid] || null;
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