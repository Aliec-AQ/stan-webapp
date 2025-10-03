import { createI18n } from 'vue-i18n'
import { fr, en, it, de, es } from './locale';

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
    en,
    it,
    de,
    es
  }
});

export function useI18n() {
  return i18n.global
}

const t: (key: string, ...args: any[]) => string = i18n.global.t;

export default t;