export default {
  settings: {
    title: 'Impostazioni',
    cache: {
      title: 'Gestione della cache',
      description: 'L\'applicazione memorizza i dati di linee e fermate nella cache per 2 settimane per migliorare le prestazioni. Puoi svuotare la cache se riscontri problemi o se desideri forzare un aggiornamento completo.',
      clearButton: 'Svuota cache',
      clearing: 'Cancellazione in corso...',
      cleared: 'Cache svuotata con successo!'
    },
    preferences: {
      title: 'Preferenze',
      language: 'Lingua',
      selectLanguage: 'Seleziona lingua',
      selectHomePage: 'Seleziona pagina iniziale',
      homePage: 'Pagina iniziale',
      homeOptions: {
        home: 'Home',
        favorites: 'Preferiti'
      }
    },
    about: {
      title: 'Informazioni',
      version: 'Versione',
      description: 'Questa applicazione web non ufficiale consente di accedere agli orari della rete STAN in tempo reale.',
      dataSource: 'I dati sono recuperati dal sito web'
    },
    legal: {
      title: 'Note legali',
      copyright: 'Copyright',
      copyrightText: 'Tutti gli elementi, i marchi e le proprietà intellettuali presentati in questa applicazione sono di proprietà di KGN e della rete STAN e sono protetti dalle leggi sul copyright.',
      reproduction: 'Riproduzione',
      reproductionText: 'Questa applicazione utilizza dati pubblici messi a disposizione dalla rete STAN. Le informazioni sono presentate nella loro integrità, senza modifiche o alterazioni, e non sono utilizzate per scopi commerciali o pubblicitari.',
      liability: 'Limitazione di responsabilità',
      liabilityText: 'Questa applicazione non ufficiale è fornita solo a scopo informativo. Tutti i dati e gli orari sono forniti solo a scopo informativo e non comportano alcuna responsabilità per i creatori di questa applicazione o per la rete STAN. Le informazioni possono contenere errori o omissioni.',
      externalLinks: 'Link esterni',
      externalLinksText: 'I link esterni in questa applicazione possono indirizzarti a siti di terze parti il cui contenuto non è responsabilità dei creatori di questa applicazione.',
      disclaimer: 'Questa applicazione non è affiliata né approvata da KGN o da qualsiasi azienda coinvolta nella gestione della rete STAN.'
    },
    support: {
      title: 'Supporto',
      description: 'Se riscontri problemi con l\'applicazione, puoi eseguire le seguenti azioni:',
      actions: {
        clearCache: 'Svuota la cache dell\'applicazione (opzione sopra)',
        refresh: 'Aggiorna la pagina',
        checkConnection: 'Controlla la tua connessione internet'
      }
    }
  },
  favorites: {
    title: 'Preferiti',
    empty: 'Non hai ancora fermate preferite.',
    emptyDescription: 'Aggiungi fermate ai tuoi preferiti per trovarle qui.',
  },
  home: {
    search: 'Trova una linea',
    notFound: 'Nessuna linea corrisponde alla tua ricerca.',
  },
  arret: {
    title: 'Fermate',
    passageImediat: 'In arrivo',
    loading: 'Caricamento degli arrivi...',
    noPassages: 'Nessun arrivo previsto.',
  },
  ligne: {
    title: 'Linea',
    search: 'Cerca...',
    notFound: 'Nessuna linea trovata.',
    detail: 'Visualizza dettagli',
  }
};
