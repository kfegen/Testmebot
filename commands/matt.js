//Mention a user in Discord based on their unique ID
exports.run = (client, message) => {
  message.channel.sendMessage('<@USER_ID>');
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['trash'],
  permLevel: 0
};

exports.help = {
  name: 'matt',
  description: 'There is no help for Matt. But you can try some of his aliases!',
  usage: 'matt'
};