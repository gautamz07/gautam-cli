const abbrev =  require('abbrev');

const aliases = abbrev(['help', 'version', 'init'])

console.log(aliases)