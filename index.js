const Discord = require('discord.js')
const client = new Discord.Client()
const request = require('request');
let prefix = '!';
let searchWrd = "";
let googKey = "AIzaSyBjkyiGVlEGkyPgLfgRrq5G-bjp8_t3iUM";
let cxKey = "003996562640305804704:lh63vr4eppq"


client.login('NjM3MzEwOTY5NzQzNDA5MTYy.XbMUow.ZoGjX8mNwzx9nqsekV7uUhf8Cfg')

client.on('ready', () => {
    console.log('I am ready!');
});


client.on('message', message => {
    if (message.content === 'hi') {
        message.reply('hey')
    } else if (message.content.startsWith(prefix + "google")) {
         message.reply('hold on while i search!!!')
        var searchWrd = message.toString().substr(8);
        request("https://www.googleapis.com/customsearch/v1?key=" + googKey + "&cx=" + cxKey + "&q=" + searchWrd, function(err, res, body) {
            let data;

            try {
                data = JSON.parse(body);
            } catch (error) {
                console.log(error)
                return;
            }

            if (!data) {
                console.log(data);
                message.channel.sendMessage("Error:\n" + JSON.stringify(data));
                return;
            } else if (!data.items || data.items.length == 0) {
                console.log(data);
                message.channel.sendMessage("No result found");
                return;
            }

            for (var i = 0; i < 5; i++) {
                let result = data.items[i];
                message.channel.sendMessage(result.title + '\n' + result.link);
            }


        });
    } else {
        //message.reply( "I am not sure what you are looking for kindly try to send me hi or use my google search capabilities by !google <to search for>");
    }




})