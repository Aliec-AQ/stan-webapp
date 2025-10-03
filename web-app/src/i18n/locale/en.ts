export default {
  settings: {
    title: 'Settings',
    cache: {
      title: 'Cache Management',
      description: "The application stores line and stop data in cache for 2 weeks to improve performance. You can clear the cache if you encounter issues or if you want to force a complete refresh.",
      clearButton: 'Clear cache',
      clearing: 'Clearing...',
      cleared: 'Cache cleared successfully!'
    },
    preferences: {
      title: 'Preferences',
      language: 'Language',
      selectLanguage: 'Select Language',
      selectHomePage: 'Select Home Page',
      homePage: 'Home page',
      homeOptions: {
        home: 'Home',
        favorites: 'Favorites'
      }
    },
    about: {
      title: 'About',
      version: 'Version',
      description: 'This unofficial web application allows you to access the STAN network schedules in real time.',
      dataSource: 'Data is retrieved from the website'
    },
    legal: {
      title: 'Legal Notice',
      copyright: 'Copyright',
      copyrightText: 'All elements, trademarks, and intellectual properties presented in this application are the property of KGN and the STAN network, and are protected by copyright laws.',
      reproduction: 'Reproduction',
      reproductionText: 'This application uses public data made available by the STAN network. The information is presented in its integrity, without modification or alteration, and is not used for commercial or advertising purposes.',
      liability: 'Limitation of Liability',
      liabilityText: 'This unofficial application is provided for informational purposes only. All data and schedules are provided for information purposes and shall not engage the responsibility of the creators of this application or the STAN network. Information may contain errors or omissions.',
      externalLinks: 'External Links',
      externalLinksText: 'External links in this application may direct you to third-party sites whose content is not the responsibility of the creators of this application.',
      disclaimer: 'This application is neither affiliated with nor endorsed by KGN or any company involved in the management of the STAN network.'
    },
    support: {
      title: 'Support',
      description: 'If you encounter problems with the application, you can perform the following actions:',
      actions: {
        clearCache: 'Clear the application cache (option above)',
        refresh: 'Refresh the page',
        checkConnection: 'Check your internet connection'
      }
    }
  },
  favorites: {
    title: 'Favorites',
    empty: 'You don\'t have any favorite stops yet.',
    emptyDescription: 'Add stops to your favorites to find them here.',
  },
  home: {
    search: 'Find a line',
    notFound: 'No lines match your search.',
  },
  arret: {
    title: 'Stops',
    passageImediat: 'Approaching',
    loading: 'Loading arrivals...',
    noPassages: 'No upcoming arrivals scheduled.',
  },
  ligne: {
    title: 'Line',
    search: 'Search...',
    notFound: 'No line found.',
    detail: 'View details',
  }
};