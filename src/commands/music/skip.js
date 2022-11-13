const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skips the current song."),
  async execute(interaction, client) {
    const queue = client.player.getQueue(interaction.guild);

    if (!queue) {
      await interaction.reply("There is no song playing.");
      return;
    }
    const currentSong = queue.current;

    queue.skip();

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(`${currentSong.title} has been skipped!`)
          .setThumbnail(currentSong.thumbnail),
      ],
    });
  },
};
