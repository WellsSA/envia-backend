const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  // blue: '\x1b[34m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  white: '\x1b[37m',
  reset: '\x1b[0m',
};

const info = message => {
  const finalMessage = message
    .replace(/g</g, colors.green)
    .replace(/r</g, colors.red)
    .replace(/b</g, colors.cyan)
    .replace(/y</g, colors.yellow)
    .replace(/w</g, colors.white)
    .replace(/>(g|r|b|y|c|w)/g, colors.reset);
  console.info(finalMessage);
};

export { info, colors };
