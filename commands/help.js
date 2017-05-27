//Help command called to provide users with a list of commands based on their permission level.
const settings = require('../settings.json');
exports.run = (client, message, params) => {

 //If the help command was called with parameters. 
  if (!params[0]) {

//Get user permlvl, list of command names, and set an empty array to append to later.
    let perms = client.elevation(message);
    var commandNames = Array.from(client.commands.keys());
    var commandApproved = [];

//Check each command and compare permlvl of the command to the user.
//If greater than or equal to, append the empty array.
//Else continue.
    for (var i = 0; i < commandNames.length; i++){
      var cmd = client.commands.get(commandNames[i]);
      if (perms >= cmd.conf.permLevel){
        commandApproved.push(client.commands.get(cmd.help.name));
      };
    };

//Provide help information based on the built array in a pretty format.
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    message.channel.sendCode('asciidoc', `= Command List =\n\n[Use ${settings.prefix}help <commandname> for details]\n\n${commandApproved.map(c => `${settings.prefix}${c.help.name}${' '.repeat(longest - c.help.name.length)} :: ${c.help.description}`).join('\n')}`);

//If the command was called with a parameter.
//Provide information on that command in a pretty format.    
  } else {
    let command = params[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      message.channel.sendCode('asciidoc', `= ${command.help.name} = \n${command.help.description}\nusage::${command.help.usage}`);
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['h', 'halp'],
  permLevel: 0
};

exports.help = {
  name: 'help',
  description: 'Displays all the available commands for your permission level.',
  usage: 'help [command]'
};