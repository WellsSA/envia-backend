const prepareMessage = (text, withName) => {
  return text.replace(
    /\[NOME]|\[NOME ]|\[ NOME]|\[ NOME ]/gi,
    withName.split(' ').shift()
  );
};

export { prepareMessage };
