const request = require('request');
const cheerio = require('cheerio');

exports.run = (client, message) => {

//Set empty arrays to append to later.
    var worldBoss = [];
    var worldVH = [];
    var worldAffixe = [];
    var worldEmmissaries = [];
    var worldEvent = [];

//Gather wowhead html.
    request('http://www.wowhead.com/', function (error, response, html) {
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);

//Gather all information from the daily section on front page.        
        $('div.tiw-group.tiw-group-type-misc-wrapper.tiw-group-wrapper').each(function( index ){
            for (var i = 1; i<4; i++){

//Iterate over predetermined classes.
                var worldboss = ($(this).find(`#US-epiceliteworld-${i}`).text());
                var worldvh = ($(this).find(`#US-violethold-${i}`).text());
                var worldaffixe = ($(this).find(`#US-mythicaffix-${i}`).text());
                var worldemmissaries = ($(this).find(`#US--${i}`).text());
                var worldevent = ($(this).find(`#US-holiday-${i}`).text());
                
//Check to see if iteration provided usefull information and not ''
//Append empty arrays.
                if ( worldboss != ''){
                worldBoss.push(worldboss);
                };
                if ( worldvh != ''){
                worldVH.push(worldvh);
                };
                if ( worldaffixe != ''){
                worldAffixe.push(worldaffixe);
                };
                if ( worldemmissaries != ''){
                worldEmmissaries.push(worldemmissaries);
                };
                if ( worldevent != ''){
                worldEvent.push(worldevent);
                };
            };
        });
    };

    //Pretty formatting.
    message.channel.sendCode('asciidoc', `= Today in WoW =\n\nEmmissaries  :: ${worldEmmissaries.toString()}\n\nAffixes      ::${worldAffixe.toString()}\n\nWorld Bosses :: ${worldBoss.toString()}\n\nViolet Hold  :: ${worldVH.toString()}\n\nWorld Events ::${worldEvent.toString()}`);
    });
    
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['warcraft, WoW'],
  permLevel: 0
};

exports.help = {
  name: 'wow',
  description: 'Your daily update of the World of Warcraft',
  usage: 'wow'
};