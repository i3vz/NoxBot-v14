const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Returns my ping'),
    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true
        });

        const newMessage = `Last heartbeat calculated ${message.createdTimestamp - interaction.createdTimestamp}🛰️`
        await interaction.editReply({
            content: newMessage
        });
    },
};