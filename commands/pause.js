const { EmbedBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
	name: "pause",
	description: "Остановить музыку",
	voiceChannel: true,

	async execute({ inter }) {
		const queue = useQueue(inter.guild);
		if (!queue?.isPlaying())
			return inter.editReply({
				content: `Музыка сейчас не играет ${inter.member}... попробуйте снова ❌`,
			});

		if (queue.node.isPaused())
			return inter.editReply({
				content: `Музыка уже остановлена ${inter.member}... попробуйте снова ❌`,
			});

		const success = queue.node.setPaused(true);
		const pauseEmbed = new EmbedBuilder()
			.setAuthor({
				name: success
					? `Музыка ${queue.currentTrack.title} остановлена ✅`
					: `Что-то пошло не так ${inter.member}... попробуйте снова ❌`,
			})
			.setColor("#2f3136");

		return inter.editReply({ embeds: [pauseEmbed] });
	},
};
