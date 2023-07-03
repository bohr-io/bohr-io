import { createI18n } from 'vue-i18n';
import enUS from './locales/en-US.json';
import esES from './locales/es-ES.json';
import ptBR from './locales/pt-BR.json';


const localeMessages = {
  'en-US': enUS,
  'es-ES': esES,
  'pt-BR': ptBR,
}

export const availableLocales = Object.keys(localeMessages);

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
  fallbackLocale: 'en-us',
  messages: localeMessages,
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
  }
});
