import regexConstructor from './regexConstructor';

class CheckAgent {

  static MobileAgents = ['Android', 'webOS', 'iPhone', 'iPad', 'iPod', 'BlackBerry', 'IEMobile', 'Opera Mini'];
  static FirefoxAgent = ['Firefox'];

  isMobileOrTablet(userAgent) {
    const userAgentRegex = regexConstructor.make(CheckAgent.MobileAgents);
    return userAgentRegex.test(userAgent);
  }

  isFirefox(userAgent) {
    const userAgentRegex = regexConstructor.make(CheckAgent.FirefoxAgent);
    return userAgentRegex.test(userAgent);
  }

}

export default new CheckAgent();
