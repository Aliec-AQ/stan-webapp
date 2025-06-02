import { createI18n } from 'vue-i18n'
import fr from './locale/fr';
import en from './locale/en';

const getLocale = () => {
  const preferences = localStorage.getItem('preferences');
  if (preferences) {
    const { language } = JSON.parse(preferences);
    return language || 'fr';
  }
  return 'fr';
};

export const i18n = createI18n({
  legacy: false,
  locale: getLocale(),
  fallbackLocale: 'fr',
  messages: {
    fr,
    en
  }
});

export function useI18n() {
  return i18n.global
}

const { t } = i18n.global;

export default t;