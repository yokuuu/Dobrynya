const { EmbedBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
	name: "back",
	description: "Вернуться к последней песне",
	voiceChannel: true,

	async execute({ inter }) {
		const queue = useQueue(inter.guild);
		if (!queue?.isPlaying())
			return inter.editReply({
				content: `Музыка сейчас не играет ${inter.member}... попробуйте снова ❌`,
			});

		if (!queue.history.previousTrack)
			return inter.editReply({
				content: `Играет первый трек в очереди ${inter.member}... попробуйте снова ❌`,
			});

		await queue.history.back();

		const backEmbed = new EmbedBuilder()
			.setAuthor({ name: `Воспроизводится прошлый трек ✅` })
			.setColor("#2f3136");

		inter.editReply({ embeds: [backEmbed] });
	},
};
