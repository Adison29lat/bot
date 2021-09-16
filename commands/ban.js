module.exports = {
  name: 'ban',
  description: 'zbanuj',
  options: [
    {
      name: 'user',
      type: 6, //USER Type
      description: 'chlop co chcesz go zbanowac',
      required: true,
    },
  ],
  execute(interaction, client) {
    const member = interaction.options.get('user').value;

    if (!member) {
      return message.reply('Musisz wspomnieć o członku, którego chcesz zbanować');
    }

    if (!interaction.member.permissions.has('BAN_MEMBERS')) {
      return message.reply("nie moge zbanowac.");
    }

    const userinfo = client.users.cache.get(member);

    return interaction.guild.members
      .ban(member)
      .then(() => {
        interaction.reply({
          content: `${userinfo.username} zostal zbanowany.`,
          ephemeral: true,
        });
      })
      .catch(error =>
        interaction.reply({
          content: `blad,ban.js.`,
          ephemeral: true,
        }),
      );
  },
};
