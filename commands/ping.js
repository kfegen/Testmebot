//Returns ping then edits the message to pong (tests bots reaction speed). 
exports.run = (client, message) => {
  message.channel.sendMessage('Ping?')
    .then(msg => {
      msg.edit(`Pong! (took: ${msg.createdTimestamp - message.createdTimestamp}ms)`);
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 1
};

exports.help = {
  name: 'ping',
  description: 'Ping/Pong command',
  usage: 'ping'
};