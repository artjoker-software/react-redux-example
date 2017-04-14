import { language } from '../constants';

const SEPARATOR = '/';
const supportedLangs = (Object.values(language).length > 0) ? Object.values(language) : [];

const initialState = {
  parsed: false,
  fromHistory: false,
  data: {
    locale: language.default,
    location: '/'
  }
};

// Get locale, url location and option type
const parseBasePart = (parts) => {
  const localeSet = (supportedLangs.indexOf(parts[0]) !== -1);
  const startIdx = (localeSet) ? 0 : 1;

  return {
    locale: (localeSet) ? parts[startIdx] : language.default,
    location: parts[1 - startIdx]
  };
};

// Main parser
const parseUrl = (url) => {
  const paramsObj = {
    locale: null,
    location: '/'
  };

  // Initial url parts
  const urlParts1 = url
    .split(SEPARATOR)
    .slice((url[0] === SEPARATOR) ? 1 : 0)
    .filter(part => (part !== 'undefined' && part !== 'null'));

  // Parse
  const base = parseBasePart(urlParts1);
  paramsObj.locale = base.locale;
  paramsObj.location = base.location;

  return paramsObj;
};

export default { parseUrl, initialState };
