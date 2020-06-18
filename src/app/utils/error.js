const throwError = (message, data = []) => {
  return {
    error: { message, data },
  };
};

export { throwError };
