const colors = {
  success: '\x1b[32m',
  error: '\x1b[31m',
  reset: '\x1b[0m',
};

const info = (kind, message) => {
  const color = colors[kind] || colors.success;
  const finalMessage = message.replace(/<b/, color).replace(/b>/, colors.reset);
  console.info(finalMessage);
};

export { info, colors };
