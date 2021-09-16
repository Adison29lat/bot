const {GuildMember} = require('discord.js');

module.exports = {
  name: 'resume',
  description: 'groj znowu',
  async execute(interaction, player) {
    if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
      return void interaction.reply({
        content: 'ni ma syna w domu',
        ephemeral: true,
      });
    }

    if (
      interaction.guild.me.voice.channelId &&
      interaction.member.voice.channelId !== interaction.guild.me.voice.channelId
    ) {
      return void interaction.reply({
        content: 'ni ma syna w moim domu ',
        ephemeral: true,
      });
    }

    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing)
      return void interaction.followUp({
        content: 'nic nie gro',
      });
    const success = queue.setPaused(false);
    return void interaction.followUp({
      content: success ? 'odpazuwaone' : 'zdupcylo sie cosik',
    });
  },
};
