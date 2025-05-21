const { EmbedBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
	name: "clear",
	description: "Очистить очередь",
	voiceChannel: true,

	async execute({ inter }) {
		const queue = useQueue(inter.guild);
		if (!queue?.isPlaying())
			return inter.editReply({
				content: `Музыка сейчас не играет ${inter.member}... попробуйте снова ❌`,
			});

		if (!queue.tracks.toArray()[1])
			return inter.editReply({
				content: `Нет музыки в очереди после текущей ${inter.member}... попробуйте снова ? ❌`,
			});

		queue.tracks.clear();

		const clearEmbed = new EmbedBuilder()
			.setAuthor({ name: `Очередь очищена 🗑️` })
			.setColor("#2f3136");

		inter.editReply({ embeds: [clearEmbed] });
	},
};
