const prepareMessage = (text, withName) => {
  return text.replace(/\[( |)NOME( |)\]/gi, withName.split(' ').shift());
};

const prepareFullName = (text, withName) => {
  return text.replace(/\[( |)NOME( |)\]/gi, withName);
};

export { prepareMessage, prepareFullName };
