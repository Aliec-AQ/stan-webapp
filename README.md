# STAN Web App

Une application web non-officielle pour consulter les horaires du réseau de transport STAN de Nancy en temps réel.

Voici le lien vers l'application déployée: [https://aliec-aq.github.io/stan-webapp/](https://aliec-aq.github.io/stan-webapp/)

## À propos

Cette application web permet aux utilisateurs de consulter les horaires des bus du réseau STAN de Nancy en temps réel. Elle offre une interface simple et intuitive pour:

- Consulter la liste des lignes disponibles
- Trouver les arrêts par ligne
- Afficher les prochains passages en temps réel
- Accéder aux plans des lignes au format PDF

## Technologies utilisées

- Vue.js 3
- Composition API
- Tailwind CSS
- Axios pour les requêtes HTTP

## Fonctionnalités

- **Consultation des lignes**: Affichage de toutes les lignes du réseau STAN
- **Recherche d'arrêts**: Trouver facilement les arrêts par ligne
- **Horaires en temps réel**: Affichage des prochains passages avec indication des temps théoriques ou en temps réel
- **Plans des lignes**: Accès aux PDF des plans officiels
- **Gestion du cache**: Stockage local des données pour améliorer les performances et réduire la consommation de données
- **Gestion des favoris**: Permet aux utilisateurs de marquer leurs arrêts préférés pour un accès rapide
- **Internationalisation**: Support pour plusieurs langues (français et anglais)

## Mentions légales

Cette application est non-officielle et n'est pas affiliée au réseau STAN ou à KGN. Les données affichées sont extraites du site officiel [reseau-stan.com](https://reseau-stan.com) à des fins informatives uniquement.

### Droits d'auteur
Tous les éléments, marques et propriétés intellectuelles présentés dans cette application sont la propriété de KGN et du réseau STAN, et sont protégés par les lois sur les droits d'auteur.

### Limitation de responsabilité
Cette application est proposée à titre informatif uniquement. Les horaires et informations sont fournis à titre indicatif et ne sauraient engager la responsabilité des créateurs de cette application.

## Autres mentions

Les expressions régulières utilisées pour l'extraction des données proviennent du [repo stan-api](https://github.com/maelgangloff/stan-api) développé par [Maël Gangloff](https://github.com/maelgangloff).
Allez voir ses autres projets, il fait des choses intéressantes !

## Licence

Ce projet est sous licence [MIT](LICENSE).
