export default {
  settings: {
    title: 'Paramètres',
    cache: {
      title: 'Gestion du cache',
      description: "L'application stocke les données des lignes et arrêts en cache pendant 2 semaines pour améliorer les performances. Vous pouvez vider le cache si vous rencontrez des problèmes ou si vous souhaitez forcer un rafraîchissement complet.",
      clearButton: 'Vider le cache',
      clearing: 'Suppression en cours...',
      cleared: 'Cache vidé avec succès !'
    },
    preferences: {
      title: 'Préférences',
      language: 'Langue',
      homePage: 'Page d\'accueil',
      homeOptions: {
        home: 'Accueil',
        favorites: 'Favoris'
      }
    },
    about: {
      title: 'À propos',
      version: 'Version',
      description: 'Cette application web non officielle vous permet d\'accéder aux horaires du réseau STAN en temps réel.',
      dataSource: 'Les données sont récupérées depuis le site'
    },
    legal: {
      title: 'Mentions légales',
      copyright: 'Droits d\'auteur',
      copyrightText: 'Tous les éléments, marques et propriétés intellectuelles présentés dans cette application sont la propriété de KGN et du réseau STAN, et sont protégés par les lois sur les droits d\'auteur.',
      reproduction: 'Reproduction',
      reproductionText: 'Cette application utilise des données publiques mises à disposition par le réseau STAN. Les informations sont présentées dans leur intégrité, sans modification ni altération, et ne sont pas utilisées à des fins commerciales ou publicitaires.',
      liability: 'Limitation de responsabilité',
      liabilityText: 'Cette application non-officielle est proposée à titre informatif uniquement. Toutes les données et horaires sont fournis à titre indicatif et ne sauraient engager la responsabilité des créateurs de cette application ou du réseau STAN. Les informations peuvent contenir des erreurs ou omissions.',
      externalLinks: 'Liens externes',
      externalLinksText: 'Les liens externes présents dans cette application peuvent vous diriger vers des sites tiers dont le contenu n\'engage pas la responsabilité des créateurs de cette application.',
      disclaimer: 'Cette application n\'est ni affiliée ni endossée par KGN ou toute société impliquée dans la gestion du réseau STAN.'
    },
    support: {
      title: 'Assistance',
      description: 'Si vous rencontrez des problèmes avec l\'application, vous pouvez effectuer les actions suivantes :',
      actions: {
        clearCache: 'Vider le cache de l\'application (option ci-dessus)',
        refresh: 'Rafraîchir la page',
        checkConnection: 'Vérifier votre connexion internet'
      }
    }
  },
  favorites: {
    title: 'Favoris',
    empty: 'Vous n\'avez pas encore d\'arrêts favoris.',
    emptyDescription: 'Ajoutez des arrêts à vos favoris pour les retrouver ici.',
  },
  home: {
    search: 'Trouver une ligne',
    notFound: 'Aucune ligne ne correspond à votre recherche.',
  },
  arret: {
    title: 'Arrêts',
    passageImediat: 'À l\'approche',
    loading: 'Chargement des passages...',
    noPassages: 'Aucun passage prévu prochainement.',
  },
  ligne: {
    title: 'Ligne',
    search: 'Rechercher...',
    notFound: 'Aucune ligne trouvée.',
    detail: 'Voir détails',
  }
};
