//Primary script, run this with command "node 'filename' "
//Import constants
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const settings = require('./settings.json');
const moment = require('moment');
require('./util/eventLoader')(client);

//Current date and time.
const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

//Build new collections for our commands and alternate command names.
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

//Read command folder and get name of commands and their aliases. Set empty collections.
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  log(`Loading a total of ${files.length} commands.`);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    log(`Loading Command: ${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

//Reload command to remove and reenter command name and aliases into collection.
client.reload = command => 
{
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

//Defines users permlvl
client.elevation = message => 
{
  let permlvl = 0;
  if (message.author.id === settings.ownerid) permlvl = 1;
  return permlvl;
};

//Bot login
client.login(settings.token);