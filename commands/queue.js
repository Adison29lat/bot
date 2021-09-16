const {GuildMember} = require('discord.js');

module.exports = {
    name: 'kolejka',
    description: 'pokazuje kolejeczke',
    options: async execute(interaction, player) {
        const queue = player.getQueue(interaction.guildId),
        const currentTrack = queue.current,
        const success = queue.show();
        content: success ? ` zostaw toto **${currentTrack}**!` : 'cos sie zdupcylio',
    };