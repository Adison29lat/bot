module.exports = {
  name: 'purge',
  description: 'Usuwanie ostatnich wiadomości we wszystkich czatach.',
  options: [
    {
      name: 'num',
      type: 4, //'INTEGER' Type
      description: 'liczba wiadmowsci ktere chcesz usunac (max 100)',
      required: true,
    },
  ],
  async execute(interaction) {
    const deleteCount = interaction.options.get('num').value;

    if (!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply('Podaj liczbe pomiezdy od 2 do 100 jako liczbe wiadomosci do usuniecia');

    const fetched = await interaction.channel.messages.fetch({
      limit: deleteCount,
    });

    interaction.channel
      .bulkDelete(fetched)
      .then(() => {
        interaction.reply({
          content: `wydupcylem te wiadmosci`,
          ephemeral: true,
        });
      })
      .catch(error => {
        interaction.reply({
          content: `nie moge wydupcyc bo: ${error}`,
          ephemeral: true,
        });
      });
  },
};
