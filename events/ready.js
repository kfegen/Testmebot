//Runs when the Bot returns "Ready"
const package = require('../package.json');
module.exports = client => {
    console.log(`${package.name} is ready!`);
}