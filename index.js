const Discord = require('discord.js')
const client = new Discord.Client()
const request = require('request');
let prefix = '!';
let searchWrd = "";
let googKey = "";
let cxKey = ""
var url = "";
var MongoClient = require('mongodb').MongoClient;


client.login('')
client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    if (message.content === 'hi') {
        message.reply('hey')
    } else if (message.content.startsWith(prefix + "google")) {
        message.reply('hold on while i search!!!')
        var searchWrd = message.toString().substr(8);
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("searches");
            var myobj = {
                searchString: searchWrd
            };
            dbo.collection("searchStrings").insertOne(myobj, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                dbo.createIndex({
                    searchString: "text"
                })
                db.close();
            });
        });
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
    } else if (message.content.startsWith(prefix + "recent")) {
        var searchWrd = message.toString().substr(8);
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("searches");
            dbo.collection("searchStrings").find({
                searchString: {
                    $regex: searchWrd
                }
            }).toArray(function(err, result) {
                if (err) throw err;
                console.log(result)
                if (!result[0].searchString) {
                    message.reply('You never searched anything like this before on google.try searching by !google <thing to search for>')
                } else {
                    message.reply('I found your last five related searches.')
                    for (var i = 0; i < 5; ++i) {
                        console.log(result)
                        message.channel.sendMessage(result[i].searchString);
                    }
                }
                db.close();
            });
        });

    }

})