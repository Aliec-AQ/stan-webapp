import { useFavoritesStore } from '@/stores/favorites';

export function transferFavorites() {
    const favoritesStore = useFavoritesStore();
    const currentFavorites = localStorage.getItem('favorites');
    
    if (!currentFavorites) {
        return;
    }
    const parsedFavorites = JSON.parse(currentFavorites);

    if (parsedFavorites && parsedFavorites.favoriteArrets) {
        // we wipe the favorites in the store to remove the old format (if there is any)
        favoritesStore.wipeFavorites();

        // we add the favorites one by one to trigger the logic in the store (to add the favorites as the new format)
        parsedFavorites.favoriteArrets.forEach((arret: any) => {
            favoritesStore.addFavorite(arret);
        });
    }
}