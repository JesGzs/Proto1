const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

    module.exports = {
  name: "withdraw",
  aliases: ["with"],
  execute: async(client, message, args) => {

  let user = message.author;

  let member = db.fetch(`money_${message.author.id}`)
  let member2 = db.fetch(`bank_${message.author.id}`)

  if (args[0] == 'all') {
    let money = await db.fetch(`bank_${message.author.id}`)
    
    db.subtract(`bank_${message.author.id}`, money)
    db.add(`money_${message.author.id}`, money)
    let embed5 = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setDescription(`<:Check:618736570337591296> Has retirado todas tus monedas de tu banco`);
  message.channel.send(embed5)
  
  } else {

  let embed2 = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setDescription(`<:Cross:618736602901905418> Especifique una cantidad a retirar`);
  
  if (!args[0]) {
      return message.channel.send(embed2)
  }
  let embed3 = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setDescription(`<:Cross:618736602901905418> No puedes retirar dinero negativo`);

  if (message.content.includes('-')) { 
      return message.channel.send(embed3)
  }
  let embed4 = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setDescription(`<:Cross:618736602901905418> No tienes tanto dinero en el banco.`);

  if (member2 < args[0]) {
      return message.channel.send(embed4)
  }

  let embed5 = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setDescription(`<:Check:618736570337591296> te has retirado ${args[0]} monedas de tu banco`);

  message.channel.send(embed5)
  db.subtract(`bank_${message.author.id}`, args[0])
  db.add(`money_${message.author.id}`, args[0])
  }
}
    }

module.exports.help = {
    name: "withdraw",
    description: "Withdraw money from bank",
    usage: "withdraw <money>",
    type: "Economy"  
}
