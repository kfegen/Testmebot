//File used for testing things.
exports.run = (client, message) => {
  message.channel.sendMessage('Testing, Testing, 1, 2,3');
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['t'],
  permLevel: 1
};

exports.help = {
  name: 'test',
  description: 'I test things',
  usage: 'test'
};