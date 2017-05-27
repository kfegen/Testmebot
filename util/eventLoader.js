//Load Discord events into the program such as users joining a server and messages being sent.
//Follow format and pass required parameters.

const reqEvent = (event) => require(`../events/${event}`)
module.exports = client => {
  client.on('ready', () => reqEvent('ready')(client));
  client.on('message', reqEvent('message'));
};