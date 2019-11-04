const Discord = require('discord.js')
const client = new Discord.Client()
const request = require('request');
client.login('NjM4NjA4OTE0NzI3ODI5NTA0.XbfNPQ.FYkJqEbTUENU_9LudCNug9BSGH0')


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg => {
  if (msg.content === 'hi') {
    msg.reply('hey')
  }
})


