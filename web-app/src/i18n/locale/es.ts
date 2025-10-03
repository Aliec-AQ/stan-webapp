export default {
  settings: {
    title: 'Configuración',
    cache: {
      title: 'Gestión de caché',
      description: 'La aplicación almacena datos de líneas y paradas en caché durante 2 semanas para mejorar el rendimiento. Puede borrar la caché si encuentra problemas o si desea forzar una actualización completa.',
      clearButton: 'Borrar caché',
      clearing: 'Borrando...',
      cleared: '¡Caché borrada con éxito!'
    },
    preferences: {
      title: 'Preferencias',
      language: 'Idioma',
      selectLanguage: 'Seleccionar idioma',
      selectHomePage: 'Seleccionar página de inicio',
      homePage: 'Página de inicio',
      homeOptions: {
        home: 'Inicio',
        favorites: 'Favoritos'
      }
    },
    about: {
      title: 'Acerca de',
      version: 'Versión',
      description: 'Esta aplicación web no oficial permite acceder a los horarios de la red STAN en tiempo real.',
      dataSource: 'Los datos se obtienen del sitio web'
    },
    legal: {
      title: 'Aviso legal',
      copyright: 'Derechos de autor',
      copyrightText: 'Todos los elementos, marcas y propiedades intelectuales presentados en esta aplicación son propiedad de KGN y de la red STAN, y están protegidos por las leyes de derechos de autor.',
      reproduction: 'Reproducción',
      reproductionText: 'Esta aplicación utiliza datos públicos proporcionados por la red STAN. La información se presenta en su totalidad, sin modificaciones ni alteraciones, y no se utiliza con fines comerciales o publicitarios.',
      liability: 'Limitación de responsabilidad',
      liabilityText: 'Esta aplicación no oficial se proporciona únicamente con fines informativos. Todos los datos y horarios se proporcionan únicamente con fines informativos y no comprometen la responsabilidad de los creadores de esta aplicación ni de la red STAN. La información puede contener errores u omisiones.',
      externalLinks: 'Enlaces externos',
      externalLinksText: 'Los enlaces externos en esta aplicación pueden dirigirle a sitios de terceros cuyo contenido no es responsabilidad de los creadores de esta aplicación.',
      disclaimer: 'Esta aplicación no está afiliada ni respaldada por KGN ni por ninguna empresa involucrada en la gestión de la red STAN.'
    },
    support: {
      title: 'Soporte',
      description: 'Si encuentra problemas con la aplicación, puede realizar las siguientes acciones:',
      actions: {
        clearCache: 'Borrar la caché de la aplicación (opción anterior)',
        refresh: 'Actualizar la página',
        checkConnection: 'Verificar su conexión a internet'
      }
    }
  },
  favorites: {
    title: 'Favoritos',
    empty: 'Aún no tienes paradas favoritas.',
    emptyDescription: 'Agrega paradas a tus favoritos para encontrarlas aquí.',
  },
  home: {
    search: 'Buscar una línea',
    notFound: 'No hay líneas que coincidan con su búsqueda.',
  },
  arret: {
    title: 'Paradas',
    passageImediat: 'Aproximándose',
    loading: 'Cargando llegadas...',
    noPassages: 'No hay llegadas programadas.',
  },
  ligne: {
    title: 'Línea',
    search: 'Buscar...',
    notFound: 'No se encontró ninguna línea.',
    detail: 'Ver detalles',
  }
};
