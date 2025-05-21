const { QueueRepeatMode, useQueue } = require("discord-player");
const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");

module.exports = {
	name: "loop",
	description: "Переключить повтор песен или всей очереди",
	voiceChannel: true,
	options: [
		{
			name: "action",
			description: "Что вы хотите сделать",
			type: ApplicationCommandOptionType.String,
			required: true,
			choices: [
				{ name: "Queue", value: "enable_loop_queue" },
				{ name: "Disable", value: "disable_loop" },
				{ name: "Song", value: "enable_loop_song" },
				{ name: "Autoplay", value: "enable_autoplay" },
			],
		},
	],

	async execute({ inter }) {
		const queue = useQueue(inter.guild);
		const errorMessage = `Что-то пошло не так ${inter.member}... попробуйте снова ❌`;
		let baseEmbed = new EmbedBuilder().setColor("#2f3136");

		if (!queue?.isPlaying())
			return inter.editReply({
				content: `Музыка сейчас не играет ${inter.member}... попробуйте снова ❌`,
			});

		switch (inter.options._hoistedOptions.map((x = x.value)).toString()) {
			case "enable_loop_queue": {
				if (queue.repeatMode === QueueRepeatMode.TRACK)
					return inter.editReply({
						content: `Сначала необходимо отключить текущую музыку в режиме повтора. (\`/loop Disable\`) ${inter.member}... попробуйте снова ❌`,
					});

				const success = queue.setRepeatMode(QueueRepeatMode.QUEUE);
				baseEmbed.setAuthor({
					name: success ? errorMessage : `Вся очередь будет играть повторно 🔁`,
				});

				return inter.editReply({ embeds: [baseEmbed] });
			}
			case "disable_loop": {
				if (queue.repeatMode === QueueRepeatMode.OFF)
					return inter.editReply({
						content: `Сначала необходимо включить режим повтора. (/loop Queue или /loop Song) ${inter.member}... попробуйте снова ❌`,
					});

				const success = queue.setRepeatMode(QueueRepeatMode.OFF);
				baseEmbed.setAuthor({
					name: success ? errorMessage : `Прекращен повтор очереди 🔁`,
				});

				return inter.editReply({ embeds: [baseEmbed] });
			}
			case "enable_loop_song": {
				if (queue.repeatMode === QueueRepeatMode.QUEUE)
					return inter.editReply({
						content: `Сначала необходимо выключить режим повтора. (\`/loop Disable\`) ${inter.member}... попробуйте снова ❌`,
					});

				const success = queue.setRepeatMode(QueueRepeatMode.TRACK);
				baseEmbed.setAuthor({
					name: success
						? errorMessage
						: `Режим повтора включен (Выключить - \`/loop disable\` )`,
				});

				return inter.editReply({ embeds: [baseEmbed] });
			}
			case "enable_autoplay": {
				if (queue.repeatMode === QueueRepeatMode.AUTOPLAY)
					return inter.editReply({
						content: `Сначала необходимо выключить режим повтора. (\`/loop Disable\`) ${inter.member}... попробуйте снова ❌`,
					});

				const success = queue.setRepeatMode(QueueRepeatMode.AUTOPLAY);
				baseEmbed.setAuthor({
					name: success
						? errorMessage
						: `Автовоспроизведение включено, очередь будет автоматически заполнена песнями, похожими на текущую. 🔁`,
				});

				return inter.editReply({ embeds: [baseEmbed] });
			}
		}
	},
};
