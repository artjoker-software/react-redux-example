import { language } from '../constants';

const appendLocale = (locale = language.default, route) => {
  const prefix = (locale === language.default) ? '' : `/${locale}`;
  return prefix + route;
};

export default appendLocale;
