import en from './home-i18n/en.js';
import pt from './home-i18n/pt.js';

const locales = {
  en,
  pt,
}

function objectPropertyFromDotStringKey(obj, key) {
  const keysArr = key.split('.');
  return keysArr.reduce((acc, cur) => {
    return acc?.[cur] ? acc[cur] : undefined;
  }, obj);
}

const htmlNode = document.documentElement;
const i18nTextEls = document.querySelectorAll('[data-i18n]');
const toggleLocaleBtn = document.querySelector('#locale__btn');

const availableLocales = ['pt', 'en'];

function setLocale(selectedLocale) {
  const newLocale = availableLocales.includes(selectedLocale) ? selectedLocale : 'en';

  htmlNode.lang = newLocale;
  i18nTextEls.forEach((el) => {
    const i18nKey = el.getAttribute('data-i18n');
    el.innerHTML = objectPropertyFromDotStringKey(locales[htmlNode.lang], i18nKey) || i18nKey;
  });
}

toggleLocaleBtn.addEventListener('click', () => {
  const newLocale = htmlNode.lang === 'pt' ? 'en' : 'pt';
  setLocale(newLocale);
});

const userDefaultLocale = navigator.language.split('-')[0] || 'pt';
setLocale(userDefaultLocale);
