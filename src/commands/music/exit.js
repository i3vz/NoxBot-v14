const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("exit")
    .setDescription("Kick the bot from the channel."),
  async execute(interaction, client) {
    const queue = client.player.getQueue(interaction.guild);

    if (!queue) {
      await interaction.reply("There is no song playing.");
      return;
    }
    const currentSong = queue.current;

    queue.destroy();

    await interaction.reply("I left the voice channel");
  },
};