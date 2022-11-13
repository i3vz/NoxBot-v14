require("dotenv").config();
const { token } = process.env;

const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const { Player } = require("discord-player");
const { Client, Collection, GatewayIntentBits } = require("discord.js");

const fs = require("fs");
const path = require("node:path");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMembers, 
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
  const functionsFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionsFiles)
    require(`./functions/${folder}/${file}`)(client);
}

client.commands = new Collection();
client.commandArray = [];

client.player = new Player(client, {
  ytdlOptions: {
    quality: "highestaudio",
    highWaterMark: 1 << 25
  }
});

client.handleEvents();
client.handleCommands();
client.login(token);
