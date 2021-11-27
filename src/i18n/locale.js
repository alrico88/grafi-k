export function getBestLanguage() {
  const lang = navigator.language;

  return lang.split('-')[0];
}

export function getDateLocale() {
  const browserPref = getBestLanguage();

  return browserPref === 'es' ? browserPref : 'en';
}
