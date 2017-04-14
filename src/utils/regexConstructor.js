class RegexConstructor {
  make(strArray) {
    let strRegExp = '';

    for (const str of strArray) {
      strRegExp += `${str}|`;
    }

    return new RegExp(strRegExp.slice(0, -1), 'i');
  }
}

export default new RegexConstructor();
