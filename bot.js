const Discord = require('discord.js')
const client = new Discord.Client({
  intents: [
    "GUILDS",
    "GUILD_MESSAGES"
  ]
});
const fetch = require('node-fetch');
const config = process.env;


function getQuote()
{
  return fetch('https://animechan.vercel.app/api/random')
    .then(response => response.json())
    .then(qute => {
      console.log(qute)
      return qute.quote+" - "+ qute.character +" from "+ qute.anime;
    })
}

client.on('ready', () => {
  console.log(client.user.username + ' is online.')
});
 
client.on('messageCreate', (msg) => {
  if(msg.author.bot)return
  
  if(msg.content==="$inspire")
  {
    getQuote().then(qute=>msg.channel.send(qute))  
  }
});
 

 
client.login(config.token);
