export type Ligne = {
    id: number;
    numlignepublic: string;
    osmid: string;
    libelle: string;
    image: string;
};

export type Arret = {
    ligne: Ligne;
    libelle: string;
    osmid: string;
};

export type Passage = {
    arret: Arret;
    direction: string;
    temps_min: number; // in minutes
    temps_theorique: boolean;
};
