import { createI18n } from 'vue-i18n';
import messages from '@intlify/unplugin-vue-i18n/messages';

export const availableLocales = Object.keys(messages);

function isValidLocale(locale: string) {
  return availableLocales.includes(locale);
}

function getLocale() {
  const localStorageLocale = localStorage.getItem('appLocale');
  if (localStorageLocale && isValidLocale(localStorageLocale)) return localStorageLocale;

  let newLocale = '';

  if (navigator.languages && navigator.languages.length) {
    newLocale = navigator.languages[0];
  } else {
    newLocale = navigator.language;
  }

  if (!(newLocale && isValidLocale(newLocale))) newLocale = 'en-US';
  document.querySelector('html')?.setAttribute('lang', newLocale);
  return newLocale;
}

const locale = getLocale();
document.documentElement.lang = locale;

export default createI18n({
  locale,
  messages,
  fallbackLocale: 'en-us',
  datetimeFormats: {
    'en-US': {
      dayMonthTime: {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }
    },
    'es-ES': {
      dayMonthTime: {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }
    },
    'pt-BR': {
      dayMonthTime: {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }
    }
  },
  legacy: false,
  globalInjection: true
});
