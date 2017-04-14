import locales from "../../public/locales.json";

export function getBestMatchingMessages(locale) {
  if (locale in locales) {
    return locales[locale];
  }
  let [language] = locale.split("-");
  if (language in locales) {
    return locales[language];
  }
  return locales["en"];
}

export function getFirstBrowserLanguage() {
  let nav = window.navigator;
  let browserLanguagePropertyKeys = [
    "language",
    "browserLanguage",
    "systemLanguage",
    "userLanguage"
  ];
  let i = 0;
  let language = "";

  // support for HTML 5.1 "navigator.languages"
  if (Array.isArray(nav.languages)) {
    for (let i = 0; i < nav.languages.length; i++) {
      let language = nav.languages[i];
      if (language && language.length) {
        return language;
      }
    }
  }

  // support for other well known properties in browsers
  for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
    language = nav[browserLanguagePropertyKeys[i]];
    if (language && language.length) {
      return language;
    }
  }

  return null;
}
