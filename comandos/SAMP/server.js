const Discord = require('discord.js');
const { Client, Intents } = require(`discord.js`)
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
const { host, puerto, plataforma} = require('./config.json')
const gamedig = require('gamedig')
module.exports = {
    name: "server",
async execute(client, message, args){
    gamedig.query({
        type: plataforma,
        host: host,
        port: puerto

    }).then(async (state) => {
        var embed = new Discord.MessageEmbed() // este embed es si el servidor no tiene clave, enviara este.
        .setTitle(`${state.name}`)
        .addFields(
            {name: "Ip:", value: `${state.connect}`},
            {name: "GameMode:", value: `${state.raw.gamemode}`},
            {name: "Contraseña:", value: `No`},
            {name: "Jugadores:", value: `${state.raw.numplayers}/${state.maxplayers}`},
            {name: "Ping:", value: `${state.ping}`},
            {name: "Mapa:", value: `${state.raw.rules.mapname}`},
            {name: "Versión:", value: `${state.raw.rules.version}`},
            {name: "WorldTime:", value: `${state.raw.rules.worldtime}`},
            {name: "Weburl:", value: `${state.raw.rules.weburl}`}
        )
        .setTimestamp()
        .setFooter(`${state.name}`)
        .setColor('DARK_GREEN')
        .setThumbnail(message.guild.iconURL({dynamic: true}))
        var embed2 = new Discord.MessageEmbed() // si tiene clave el servidor, enviara este embed.
        .setTitle(`${state.name}`)
        .addFields(
            {name: "Ip:", value: `${state.connect}`},
            {name: "GameMode:", value: `${state.raw.gamemode}`},
            {name: "Contraseña:", value: `Si`},
            {name: "Jugadores:", value: `${state.raw.numplayers}/${state.maxplayers}`},
            {name: "Ping:", value: `${state.ping}`},
            {name: "Mapa:", value: `${state.raw.rules.mapname}`},
            {name: "Versión:", value: `${state.raw.rules.version}`},
            {name: "Hora:", value: `${state.raw.rules.worldtime}`},
            {name: "Weburl:", value: `${state.raw.rules.weburl}`}
        )
        .setTimestamp()
        .setFooter(`${state.name}`)
        .setColor('RED')
        .setThumbnail(message.guild.iconURL({dynamic: true}))
    if(state.password === false) return message.channel.send({embeds: [embed]});
    if(state.password === true) return message.channel.send({embeds: [embed2]});
    }).catch(err => {
            console.log(err)
            const embed3 = new Discord.MessageEmbed()
            .setTitle(`Servidor desconectado 🔴`)
            .setColor('RED')
            .setTimestamp()
            
            message.channel.send({embeds: [embed3]})    
    });
}
}