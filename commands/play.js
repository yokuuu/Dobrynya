const { QueryType, useMainPlayer } = require("discord-player");
const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");

module.exports = {
	name: "play",
	description: "Включите песню!",
	voiceChannel: true,
	options: [
		{
			name: "song",
			description: "Название песни для воспроизведения",
			type: ApplicationCommandOptionType.String,
			required: true,
		},
	],

	async execute({ inter, client }) {
		const player = useMainPlayer();

		const song = inter.options.getString("song");
		const res = await player.search(song, {
			requestedBy: inter.member,
			searchEngine: QueryType.AUTO,
		});

		let defaultEmbed = new EmbedBuilder().setColor("#2f3136");

		if (!res?.tracks.length) {
			defaultEmbed.setAuthor({ name: `Результат не найден...` });
			return inter.editReply({ embeds: [defaultEmbed] });
		}

		try {
			const { track } = await player.play(inter.member.voice.channel, song, {
				nodeOptions: {
					metadata: {
						channel: inter.channel,
					},
					volume: client.config.opt.volume,
					leaveOnEmpty: client.config.opt.leaveOnEmpty,
					leaveOnEmptyCooldown: client.config.opt.leaveOnEmptyCooldown,
					leaveOnEnd: client.config.opt.leaveOnEnd,
					leaveOnEndCooldown: client.config.opt.leaveOnEndCooldown,
				},
			});

			defaultEmbed.setAuthor({
				name: `Загружаем ${track.title} в очередь ✅`,
			});
			await inter.editReply({ embeds: [defaultEmbed] });
		} catch (error) {
			console.log(`Ошибка воспроизведения ${error}`);
			defaultEmbed.setAuthor({ name: `Нет возможности зайти на сервер ❌` });
			return inter.editReply({ embeds: [defaultEmbed] });
		}
	},
};
