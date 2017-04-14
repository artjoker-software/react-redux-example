import { language } from '../../constants';
import { expect } from 'chai';
import { getLocalization, loadLanguageData } from '../../helpers/localization';

describe('@localization hepler methods', () => {
  it('it should return default localization if get empty route ', () => {
    expect(getLocalization('')).to.equal(language.default);
  });

  it('it should return default localization if get unknown :locale \"ua\"', () => {
    expect(getLocalization('ua')).to.equal(language.default);
  });

  it('it should return optional localization \"en\"', () => {
    expect(getLocalization(language.optionalLanguage)).to.equal(language.optionalLanguage);
  });

  it('it should return json object with translation ', () => {
    expect(loadLanguageData('en')).to.be.a('object');
  });
});
