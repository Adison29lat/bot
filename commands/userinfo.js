module.exports = {
  name: 'userinfo',
  description: 'informacje o uzytkowniky',
  options: [
    {
      name: 'user',
      type: 6, //USER TYPE
      description: 'chlop o ktroym wchesz wiedzeic wszytko',
      required: true,
    },
  ],
  execute(interaction, client) {
    const member = interaction.options.get('user').value;
    const user = client.users.cache.get(member);

    interaction.reply({
      content: `nazwa: ${user.username}, ID: ${user.id}, zdjecie: ${user.displayAvatarURL({dynamic: true})}`,
      ephemeral: true,
    });
  },
};
