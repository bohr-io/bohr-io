import en from './home-i18n/en.js';
import es from './home-i18n/es.js';
import pt from './home-i18n/pt.js';

const locales = {
  en,
  es,
  pt,
}

const availableLocales = Object.keys(locales);

function objectPropertyFromDotStringKey(obj, key) {
  const keysArr = key.split('.');
  return keysArr.reduce((acc, cur) => {
    return acc?.[cur] ? acc[cur] : undefined;
  }, obj);
}

const htmlNode = document.documentElement;
const i18nTextEls = document.querySelectorAll('[data-i18n]');
const localeButtons = document.querySelectorAll('[data-locale-button]');

function setLocale(selectedLocale) {
  localStorage.setItem('@bohr-io:lang', selectedLocale);
  const storageLocale = localStorage.getItem('@bohr-io:lang');
  const newLocale = availableLocales.includes(storageLocale)
    ? selectedLocale
    : 'en';

  htmlNode.lang = newLocale;
  i18nTextEls.forEach((el) => {
    const i18nKey = el.getAttribute('data-i18n');
    el.innerHTML =
      objectPropertyFromDotStringKey(locales[htmlNode.lang], i18nKey) ||
      i18nKey;
  });
}

localeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const newLocale = button.dataset.localeButton;
    setLocale(newLocale);
  });
});

const defaultLocale = localStorage.getItem('@bohr-io:lang') || 'en';

setLocale(defaultLocale);
