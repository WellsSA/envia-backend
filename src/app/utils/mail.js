const prepareMessage = (text, withName) => {
  return text.replace(/\[( |)NOME( |)\]/gi, withName.split(' ').shift());
};

export { prepareMessage };
