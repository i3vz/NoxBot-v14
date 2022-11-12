const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("uptime")
    .setDescription("Shows for how long i have been online"),
  async execute(interaction, client) {
    function duration(ms) {
      const sec = Math.floor((ms / 1000) % 60).toString();
      const min = Math.floor((ms / (1000 * 60)) % 60).toString();
      const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString();
      const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString();
      return `${days.padStart(1, "0")} days, ${hrs.padStart(
        2,
        "0"
      )} hours, ${min.padStart(2, "0")} minutes, ${sec.padStart(
        2,
        "0"
      )} seconds.`;
    }
    const message = await interaction.deferReply({
      fetchReply: true,
    });

    const newMessage = `I have been online for : ${duration(client.uptime)}`;
    await interaction.editReply({
      content: newMessage,
    });
  },
};
