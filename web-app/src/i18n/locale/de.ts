export default {
  settings: {
    title: 'Einstellungen',
    cache: {
      title: 'Cache-Verwaltung',
      description: 'Die Anwendung speichert Linien- und Haltestellendaten für 2 Wochen im Cache, um die Leistung zu verbessern. Sie können den Cache leeren, wenn Probleme auftreten oder Sie eine vollständige Aktualisierung erzwingen möchten.',
      clearButton: 'Cache leeren',
      clearing: 'Wird geleert...',
      cleared: 'Cache erfolgreich geleert!'
    },
    preferences: {
      title: 'Einstellungen',
      language: 'Sprache',
      selectLanguage: 'Sprache auswählen',
      selectHomePage: 'Startseite auswählen',
      homePage: 'Startseite',
      homeOptions: {
        home: 'Startseite',
        favorites: 'Favoriten'
      }
    },
    about: {
      title: 'Über',
      version: 'Version',
      description: 'Diese inoffizielle Webanwendung ermöglicht den Zugriff auf die Fahrpläne des STAN-Netzwerks in Echtzeit.',
      dataSource: 'Daten werden von der Website abgerufen'
    },
    legal: {
      title: 'Rechtliche Hinweise',
      copyright: 'Urheberrecht',
      copyrightText: 'Alle Elemente, Marken und geistigen Eigentumsrechte in dieser Anwendung sind Eigentum von KGN und des STAN-Netzwerks und durch Urheberrechtsgesetze geschützt.',
      reproduction: 'Reproduktion',
      reproductionText: 'Diese Anwendung verwendet öffentliche Daten, die vom STAN-Netzwerk bereitgestellt werden. Die Informationen werden in ihrer Gesamtheit, ohne Änderungen oder Bearbeitungen, und nicht für kommerzielle oder werbliche Zwecke verwendet.',
      liability: 'Haftungsbeschränkung',
      liabilityText: 'Diese inoffizielle Anwendung dient nur zu Informationszwecken. Alle Daten und Fahrpläne werden nur zur Information bereitgestellt und begründen keine Haftung der Ersteller dieser Anwendung oder des STAN-Netzwerks. Informationen können Fehler oder Auslassungen enthalten.',
      externalLinks: 'Externe Links',
      externalLinksText: 'Externe Links in dieser Anwendung können Sie zu Drittanbieter-Websites führen, deren Inhalte nicht in der Verantwortung der Ersteller dieser Anwendung liegen.',
      disclaimer: 'Diese Anwendung ist weder mit KGN noch mit einem Unternehmen, das am Management des STAN-Netzwerks beteiligt ist, verbunden oder wird von diesen unterstützt.'
    },
    support: {
      title: 'Support',
      description: 'Wenn Sie Probleme mit der Anwendung haben, können Sie folgende Aktionen durchführen:',
      actions: {
        clearCache: 'Cache der Anwendung leeren (Option oben)',
        refresh: 'Seite aktualisieren',
        checkConnection: 'Überprüfen Sie Ihre Internetverbindung'
      }
    }
  },
  favorites: {
    title: 'Favoriten',
    empty: 'Sie haben noch keine Favoriten.',
    emptyDescription: 'Fügen Sie Haltestellen zu Ihren Favoriten hinzu, um sie hier zu finden.',
  },
  home: {
    search: 'Eine Linie finden',
    notFound: 'Keine Linien entsprechen Ihrer Suche.',
  },
  arret: {
    title: 'Haltestellen',
    passageImediat: 'Annähernd',
    loading: 'Ankünfte werden geladen...',
    noPassages: 'Keine geplanten Ankünfte.',
  },
  ligne: {
    title: 'Linie',
    search: 'Suchen...',
    notFound: 'Keine Linie gefunden.',
    detail: 'Details anzeigen',
  }
};
