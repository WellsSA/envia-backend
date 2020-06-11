const throwError = message => {
  return {
    error: { message },
  };
};

export { throwError };
