const fs = require('fs');
const Discord = require('discord.js');
const Client = require('./client/Client');
const {token} = require('./config.json');
const {Player} = require('discord-player');

const client = new Client();
client.commands = new Discord.Collection();

client.on('messageCreate', gotMessage);
const replies = [
  'morda',
  'gripex to szmata',
  'zsi',
  'many to cfeeel!',
  'dima pracowac'
]
function gotMessage(msg){
  console.log(msg.content);
    if ( msg.content === 'odezwij sie saszka') {
      const r = Math.floor(Math.random() * replies.length);
        //const r = Math.floor(Math.random() * replies.length);
    msg.reply(replies[r]); 
       //  msg.channel.send(replies[r]);
    }
}


const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

console.log(client.commands);

const player = new Player(client);

player.on('error', (queue, error) => {
  console.log(`[${queue.guild.name}] Error emitted from the queue: ${error.message}`);
});

player.on('connectionError', (queue, error) => {
  console.log(`[${queue.guild.name}] Error emitted from the connection: ${error.message}`);
});

player.on('trackStart', (queue, track) => {
  queue.metadata.send(`no to gromy: **${track.title}** w **${queue.connection.channel.name}**!`);
});

player.on('trackAdd', (queue, track) => {
  queue.metadata.send(`🎶 | traczek **${track.title}** dodany!`);
});

player.on('botDisconnect', queue => {
  queue.metadata.send('wydupcam');
});

player.on('channelEmpty', queue => {
  queue.metadata.send('ni ma synow w doomu to wydupcam');
});

player.on('queueEnd', queue => {
  queue.metadata.send('i myk koniec kolejeczki ');


  
  
});

client.once('ready', async () => {
  console.log('Ready!');
});

client.once('reconnecting', () => {
  console.log('Reconnecting!');
});

client.once('disconnect', () => {
  console.log('Disconnect!');
});

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.guild) return;
  if (!client.application?.owner) await client.application?.fetch();

  if (message.content === "!eo" && message.author.id === client.application?.owner?.id) {
      await message.guild.commands.set(client.commands).then(() => {
        message.reply("czego chuju chcesz!");
      })
      .catch((err) => {
        message.reply("Could not deploy commands! Make sure the bot has the application.commands permission!");
        console.error(err)
      });
  }
});

client.on('interactionCreate', async interaction => {
  const command = client.commands.get(interaction.commandName.toLowerCase());

  try {
    if (interaction.commandName == 'ban' || interaction.commandName == 'userinfo') {
      command.execute(interaction, client);
    } else {
      command.execute(interaction, player);
    }
  } catch (error) {
    console.error(error);
    interaction.followUp({
      content: 'There was an error trying to execute that command!',
    });
  }
});

client.login(token);
