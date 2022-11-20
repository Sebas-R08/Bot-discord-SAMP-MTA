const Discord = require('discord.js');
const { Client, Intents } = require(`discord.js`)
const gamedig = require('gamedig');
const humans = []
const { Console } = require('console');
const { Transform } = require('stream');
const { host, puerto, plataforma} = require('./config.json')
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING
    ]
});

module.exports ={
    name: "jugadores",
    alias: ['players'],

async execute(client, message, args){
    humans.splice(0, humans.length);
    gamedig.query({
        type: plataforma,
        host: host,
        port: puerto
    }).then((state) => {
        function table(input) {
            const ts = new Transform({ transform(chunk, enc, cb) { cb(null, chunk) } })
            const logger = new Console({ stdout: ts })
            logger.table(input)
            const table = (ts.read() || '').toString() 
           let result = '';
            for (let row of table.split(/[\r\n]+/)) {
              let r = row.replace(/[^┬]*┬/, '┌');
              r = r.replace(/^├─*┼/, '├'); 
              r = r.replace(/│[^│]*/, '');
            r = r.replace(/^└─*┴/, '└');
              r = r.replace(/'/g, ' ');
              result += `${r}\n`;
            }
            return result;
        }
    
        function Person(Id, Username) {
            this.ID = Id
            this.Usuario = Username;
        }
        
        state.players.forEach((e) => {
            const i = new Person(e.raw.id, e.name)
    
            humans.push(i)
        })
    
        if(state.players.length === 0){
            const ie = new Person(`Vacio`, `Vacio`)
            humans.push(ie)
        }
    
        const tablet = table(humans)
       
        const jugadores = new Discord.MessageEmbed()
        .setTitle(state.name)
        .setDescription(`\`\`\`js\n${tablet}\n\`\`\``)
        .setColor('RANDOM')
        .setTimestamp()
        message.channel.send({embeds: [jugadores]})
    }).catch((error) => {
        console.log(error);
        const embed = new Discord.MessageEmbed()
        .setTitle("Servidor desconectado 🔴")
        .setColor('DARK_RED')
        .setTimestamp()
        message.reply({embeds: [embed]})
    });
      
}

} 