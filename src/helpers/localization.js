import { loadLang } from 'redux-pagan';
import { language } from '../constants';

export const loadLanguageData = (locale) => {
  const contentObj = require(`../translations/${locale}.json`);
  contentObj.privacy = require(`../translations/privacy/${locale}.json`);
  contentObj.terms = require(`../translations/terms/${locale}.json`);
  contentObj.about = require(`../translations/about/${locale}.json`);
  return contentObj;
};
export const getLocalization = lang => (lang === language.optionalLanguage) ? language.optionalLanguage : language.default;
export function setLocalization(props) {
  const lang = props.params.locale;
  const localization = getLocalization(lang);
  props.dispatch(loadLang(localization, loadLanguageData(localization)));
}
