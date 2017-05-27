//Runs whenever the server recieves a message.

const settings = require('../settings.json');
module.exports = message => {

//Check to see if incoming messages are from other bots and if the message does not contain our prefix. Returns if either are true.
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(settings.prefix)) return;

//Splits messages into its primary command and input parameters. Also grabs user permlvl.
  let command = message.content.split(' ')[0].slice(settings.prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;

//Cross reference input commands with array of commands and aliases.
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }

//Checks to see if the user meets required permlvl for the command being called.
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }

};