const Discord = require ("discord.js");
const client = new Discord.Client ({intents: ["GUILDS" , "GUILD_MESSAGES"]});
const gamedig = require('gamedig')
const fs = require('fs');
let { readdirSync } = require('fs');
const { host, puerto, plataforma } = require('./comandos/SAMP/config.json')
const { channel } = require("diagnostics_channel");
const { text } = require("figlet");
client.on("ready", () => {
    console.log(`${client.user.username} esta preparado`)

    setInterval(() => {
        gamedig.query({
            type: plataforma,
            host: host,
            port: puerto
        }).then((state) => {
            client.user.setActivity(`${client.user.username} con ${state.raw.numplayers} jugadores`); // esto es para que salga en el estado del bot la cantidad de usuarios que tiene el servidor.
        }).catch(err => {
            console.log(err);
        });
    }, 1000);
})

process.on('unhandledRejection', error =>{
    console.error(error);
});
client.on('shardError', error =>{
    console.error(error);
});

client.commands = new Discord.Collection()
let carpetas = fs.readdirSync('./comandos/').map((subCarpetas) =>{
    const archivos = fs.readdirSync(`./comandos/${subCarpetas}`).map((comandos) => {
        let comando = require(`./comandos/${subCarpetas}/${comandos}`)
        client.commands.set(comando.name, comando)
    })
})
let prefix = "!"
client.on("messageCreate", async(message) => {
    if(!message.content.startsWith(prefix))return;
    if(message.author.bot)return;

    if(message.author.bot)return; 
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command =  args.shift().toLowerCase();
    let cmd = client.commands.find((c) => c.name === command || c.alias && c.alias.includes(command));
    if(cmd){
        try {
            cmd.execute(client, message, args)
        } catch(e) {
            return;
        }
    }
    if(!cmd){
        if(!message.content === prefix) return;
    }
})
client.login(''); // token del bot.