require("dotenv").config();

const { Player } = require("discord-player");
const { Client, GatewayIntentBits } = require("discord.js");
const { YoutubeiExtractor } = require("discord-player-youtubei");

global.client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.MessageContent,
	],
	disableMentions: "everyone",
});

client.config = require("./config");

const player = new Player(client, client.config.opt.discordPlayer);

player.extractors.register(YoutubeiExtractor, {});

console.clear();
require("./loader");

client.login(client.config.app.token).catch(async e => {
	if (e.message === "An invalid token was provided.") {
		"app",
			"token",
			"\n\t   ❌ Неправильный токен ❌ \n\t Поменяйте токен в конфиге\n";
	} else {
		console.error("❌ Ошибка входа бота ❌ \n", e);
	}
});
