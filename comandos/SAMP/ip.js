const Discord = require('discord.js');
const { Client, Intents } = require(`discord.js`)
const gamedig = require('gamedig');
const humans = []
const { Console } = require('console');
const { Transform } = require('stream');
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
const { host, puerto, plataforma } = require('./config.json')
module.exports = {
    name: "ip",
    async execute(client, message, args){

        gamedig.query({
            type: plataforma,
            host: host,
            port: puerto
        }).then( async(state) => {

            const embed = new Discord.MessageEmbed()
            .setTitle(state.name)
            .setDescription(`${state.raw.numplayers}/${state.maxplayers}`)
            .addFields(
                {name: "IP:", value: `\`${state.connect}\``}
            )
            .setColor('RANDOM')
            .setTimestamp()
            .setThumbnail(message.guild.iconURL({dynamic: true}))
            message.reply({embeds: [embed]})
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