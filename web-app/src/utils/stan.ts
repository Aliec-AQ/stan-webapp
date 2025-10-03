import type { Ligne } from '@/types';

export const getColor = (ligne: Ligne) => {
    if (!ligne || !ligne.numlignepublic) return 'bg-gray-500';
    
    if (ligne.numlignepublic.startsWith('T')) {
        return 'bg-gradient-to-r from-red-500 to-red-600'; // Tempo
    } else if (ligne.numlignepublic === 'Corol') {
        return 'bg-gradient-to-r from-purple-500 to-purple-600'; // Corol
    } else if (ligne.libelle.includes('Express') || ligne.numlignepublic === 'Brabois Express') {
        return 'bg-gradient-to-r from-blue-500 to-blue-600'; // Express
    } else if (ligne.numlignepublic.startsWith('Citadine')) {
        return 'bg-gradient-to-r from-green-500 to-green-600'; // Citadine
    } else if (!isNaN(Number(ligne.numlignepublic))) {
        return 'bg-gradient-to-r from-yellow-400 to-yellow-500'; // Standard
    } else {
        return 'bg-gradient-to-r from-gray-500 to-gray-600'; // Autres
    }
}