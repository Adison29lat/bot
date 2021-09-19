// tutaj jest cos spierdolone 
 module.exports = {
  name: 'queue',
  descrioption : 'pokazuje kolejke',
  required : true,
   async execute(interaction, message) {
      if (!interaction.member.voice.channel) return interaction.channel.send(`${interaction.emotes.error} - nii ma cie w domu!`);

      if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${interaction.emotes.error} - ni ma cie w moim domu`);

      const queue = interaction.player.getQueue(message);

      if (!interaction.player.getQueue(message)) return message.channel.send(`${interaction.emotes.error} - zadno muzyka nie gro`);

      message.channel.send(`kolejeczka to - ${message.guild.name} ${interaction.emotes.queue} ${client.player.getQueue(message).loopMode ? '(zapetlone)' : ''}**\nobecna : ${queue.playing.title} | ${queue.playing.author}\n\n` + (queue.tracks.map((track, i) => {
          return `**#${i + 1}** - ${track.title} | ${track.author} (dodane orzez : ${track.requestedBy.username})`
      }).slice(0, 5).join('\n') + `\n\n${queue.tracks.length > 5 ? `I **${queue.tracks.length - 5}** inne...` : `playlista **${queue.tracks.length}** piosenka(i)...`}`));
  },
};