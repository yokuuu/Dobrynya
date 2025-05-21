const { readdirSync } = require("fs");
const { Collection } = require("discord.js");
const { useMainPlayer } = require("discord-player");
client.commands = new Collection();
const commandsArray = [];
const player = useMainPlayer();

const discordEvents = readdirSync("./events/Discord/").filter(file =>
	file.endsWith(".js")
);
const playerEvents = readdirSync("./events/Player/").filter(file =>
	file.endsWith(".js")
);
const commands = readdirSync(`./commands/`).filter(files =>
	files.endsWith(".js")
);

for (const file of discordEvents) {
	const DiscordEvent = require(`./events/Discord/${file}`);
	const txtEvent = `[Загружено событие Дискорда] ${file.split(".")[0]}`;
	console.log(txtEvent);
	client.on(file.split(".")[0], DiscordEvent.bind(null, client));
	delete require.cache[require.resolve(`./events/Discord/${file}`)];
}

for (const file of playerEvents) {
	const PlayerEvent = require(`./events/Player/${file}`);
	const txtEvent = `[Загружено событие проигрывателя] ${file.split(".")[0]}`;
	console.log(txtEvent);
	player.events.on(file.split(".")[0], PlayerEvent.bind(null));
	delete require.cache[require.resolve(`./events/Player/${file}`)];
}

for (const file of commands) {
	const command = require(`./commands/${file}`);
	if (command.name && command.description) {
		commandsArray.push(command);
		const txtEvent = `[Команда загружена] ${command.name.toLowerCase()}`;
		console.log(txtEvent);
		client.commands.set(command.name.toLowerCase(), command);
		delete require.cache[require.resolve(`./commands/${file}`)];
	} else {
		const txtEvent = `[Не удалось загрузить команду] ${command.name.toLowerCase()}`;
		console.log(txtEvent);
	}
}

client.on("ready", client => {
	if (client.config.app.global) client.application.commands.set(commandsArray);
	else
		client.guilds.cache
			.get(client.config.app.guild)
			.commands.set(commandsArray);
});
