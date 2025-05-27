import {useQuery as _useQuery, VueQueryPlugin} from "vue-query";
import {computed, ref} from "vue";

export {VueQueryPlugin};

export const useQueryEnabled = () => {
  const queryPeutEtreLancee = ref(false);

  const launchQuery = () => {
    if (queryPeutEtreLancee.value) {
      queryPeutEtreLancee.value = false;
    }
    queryPeutEtreLancee.value = true;
  };

  const enabled = computed(() => {
    return queryPeutEtreLancee.value;
  });

  return { enabled, launchQuery };
};

export const useQuery = (
  queryKey,
  queryHandler,
  options = {}
) => {
  const enabled = ref(false);

  const query = _useQuery(queryKey, queryHandler, {
    enabled,
    retry: false,
    refetchOnWindowFocus: false,
    ...options,
  });

  const execute = () => {
    if (!enabled.value) {
      enabled.value = true;
      return;
    }
    query.refetch.value();
  };

  return { execute, ...query };
};