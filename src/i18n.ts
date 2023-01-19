import { createI18n } from 'vue-i18n';
import enUS from './locales/en-us.json';
import ptBR from './locales/pt-br.json';


function availableLocales() {
  return ['en-US', 'pt-BR'];
  // const localeFilePathArray = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i).keys();
  // return localeFilePathArray.map((localeFilePath) => localeFilePath.slice(2, 7));
}

function isValidLocale(locale: string) {
  return availableLocales().includes(locale);
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

/**
 * Load locale messages
 *
 * The loaded `JSON` locale messages is pre-compiled by `@intlify/vue-i18n-loader`, which is integrated into `vue-cli-plugin-i18n`.
 * See: https://github.com/intlify/vue-i18n-loader#rocket-i18n-resource-pre-compilation
 */
function loadLocaleMessages() {
  // const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i);
  // const messages: LocaleMessages<VueMessageType> = {};
  // locales.keys().forEach(key => {
  //   const matched = key.match(/([A-Za-z0-9-_]+)\./i);
  //   if (matched && matched.length > 1) {
  //     const locale = matched[1];
  //     messages[locale] = locales(key).default;
  //   }
  // })
  // return messages;
  return {
    'en-US': enUS,
    'pt-BR': ptBR,
  };
}

const locale = getLocale();
document.documentElement.lang = locale;

export default createI18n({
  locale,
  fallbackLocale: 'en-us',
  messages: loadLocaleMessages(),
  datetimeFormats: {
    'en-us': {
      dayMonthTime: {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }
    },
    'pt-br': {
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
