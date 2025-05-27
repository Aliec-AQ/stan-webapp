import { ref } from "vue";
import { useQuery, requests } from "component-library";

export const useGetLignes = (options = {}) => {
  const lignes = ref([]);
  const loading = ref(false);

  const queryComposition = useQuery(
    ["listing-lignes"],
    async () => {
      loading.value = true;
      const response = await requests.get("https://www.reseau-stan.com/");
      loading.value = false;
      return response;
    },
    {
      onSuccess: (data) => {
        
        const regex = /data-ligne="(\d+)" data-numlignepublic="([^"]+)" data-osmid="(line[^"+]+)" data-libelle="([^"]+)" value="[^"]+">/g;
        const extractedLignes = [];
        let rawLigne;
        
        while ((rawLigne = regex.exec(data)) !== null) {
          extractedLignes.push({
            id: parseInt(rawLigne[1]),
            numlignepublic: rawLigne[2],
            osmid: rawLigne[3],
            libelle: rawLigne[4].replace('&lt;', '<').replace('&gt;', '>').replace(/&#039;/g, "'"),
            image: `https://www.reseau-stan.com/typo3conf/ext/kg_package/Resources/Public/images/pictolignes/${rawLigne[2].replace(' ','_')}.png`
          });
        }
        
        lignes.value = extractedLignes;

        if (options.successHandler) {
          options.successHandler(data);
        }
      },
      onError: (error) => {
        if (options.errorHandler) {
          options.errorHandler(error);
        }
      },
    }
  );

  return {
    lignes,
    loading,
    ...queryComposition,
  };
};

export const useGetLignesById = (id, options = {}) => {
  const ligne = ref(null);
  const loading = ref(false);

  const queryComposition = useQuery(
    ["ligne", id],
    async () => {
      loading.value = true;
      const response = await requests.get("https://www.reseau-stan.com/");
      loading.value = false;
      return response;
    },
    {
      onSuccess: (data) => {
        
        const regex = /data-ligne="(\d+)" data-numlignepublic="([^"]+)" data-osmid="(line[^"+]+)" data-libelle="([^"]+)" value="[^"]+">/g;
        const extractedLignes = [];
        let rawLigne;
        
        while ((rawLigne = regex.exec(data)) !== null) {
          extractedLignes.push({
            id: parseInt(rawLigne[1]),
            numlignepublic: rawLigne[2],
            osmid: rawLigne[3],
            libelle: rawLigne[4].replace('&lt;', '<').replace('&gt;', '>').replace(/&#039;/g, "'"),
            image: `https://www.reseau-stan.com/typo3conf/ext/kg_package/Resources/Public/images/pictolignes/${rawLigne[2].replace(' ','_')}.png`
          });
        }
        
        ligne.value = extractedLignes.find(l => l.id === id) || null;

        if (options.successHandler) {
          options.successHandler(ligne.value);
        }
      },
      onError: (error) => {
        if (options.errorHandler) {
          options.errorHandler(error);
        }
      },
    }
  );

  return {
    ligne,
    loading,
    ...queryComposition,
  };
}

export const useGetArrets = (options = {}) => {
  const arrets = ref([]);
  const loading = ref(false);
  const payload = ref({
    idLigne: null,
    numlignepublic: null,
  });

  const queryComposition = useQuery(
    ["listing-arrets", payload],
    async () => {
      console.log("Fetching arrets with payload:", payload.value);
      if (!payload.value.idLigne || !payload.value.numlignepublic) {
        return null;
      }
      
      loading.value = true;
      
      const formData = new FormData();
      formData.append('requete', 'tempsreel_arrets');
      formData.append('requete_val[ligne]', payload.value.idLigne);
      formData.append('requete_val[numLignePublic]', payload.value.numlignepublic);
      
      const response = await requests.post("https://www.reseau-stan.com/?type=476", formData, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      });

      if (response) {
        arrets.value = extractDataArrets(response);
      }
      
      loading.value = false;
      return response;
    }
  );

  const extractDataArrets = (responseBody) => {
    const regex = /data-libelle="([^"]+)" data-ligne="(\d+)" data-numlignepublic="([^"]*)" value="([^"]+)">([^<]+)<\/option>/g;
    const extractedArrets = [];
    let match;
    
    while ((match = regex.exec(responseBody)) !== null) {
      extractedArrets.push({
        libelle: match[1],
        ligneId: parseInt(match[2]),
        numLignePublic: match[3],
        osmid: match[4],
        nom: match[5]
      });
    }

    return extractedArrets;
  };

  const fetchArrets = (ligne) => {
    if (ligne) {
      payload.value = {
        idLigne: ligne.id,
        numlignepublic: ligne.numlignepublic
      };
      queryComposition.refetch.value();
    }
  };

  return {
    arrets,
    loading,
    payload,
    fetchArrets,
    ...queryComposition,
  };
};