const {GuildMember} = require('discord.js');

module.exports = {
  name: 'pause',
  description: 'pauza',
  async execute(interaction, player) {
    if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
      return void interaction.reply({
        content: 'ni ma sna w domu',
        ephemeral: true,
      });
    }

    if (
      interaction.guild.me.voice.channelId &&
      interaction.member.voice.channelId !== interaction.guild.me.voice.channelId
    ) {
      return void interaction.reply({
        content: 'ni ma syna w moim domu',
        ephemeral: true,
      });
    }

    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing)
      return void interaction.followUp({
        content: 'nic nie grta',
      });
    const success = queue.setPaused(true);
    return void interaction.followUp({
      content: success ? 'co pauzujesz blady' : 'no i chuj bombki strzelil',
    });
  },
};
