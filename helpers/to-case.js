/* eslint-disable */

const toCase = (str, strCase) => {
  str = str.replace(/[^\w\d_-]/, '');

  if (strCase === 'kebab-case') {
    return str
      .replace(/([\w\d])[_ ]([\w\d])/g, (_, m1, m2) => m1 + '-' + m2)
      .replace(/([\w\d])?([A-Z])/g, (_, m1, m2) => m1 ? m1 + '-' + m2.toLowerCase() : m2.toLowerCase());
  }
  if (strCase === 'camelCase') {
    return str.replace(/([\w\d])[-_ ]([\w\d])/g, (_, m1, m2) => m1 + m2.toUpperCase());
  }
  if (strCase === 'ClassCase') {
    str = str.replace(/([\w\d])[-_ ]([\w\d])/g, (_, m1, m2) => m1 + m2.toUpperCase());
    return str.slice(0, 1).toUpperCase() + str.slice(1);
  }

  throw new Error(strCase + ' is an invalid string case');
};

module.exports = toCase;
