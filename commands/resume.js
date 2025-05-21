const { EmbedBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
	name: "resume",
	description: "Возобновить музыку",
	voiceChannel: true,

	async execute({ inter }) {
		const queue = useQueue(inter.guild);
		if (!queue)
			return inter.editReply({
				content: `Музыка сейчас не играет ${inter.member}... попробуйте снова ❌`,
			});

		if (queue.node.isPlaying())
			return inter.editReply({
				content: `Музыка уже воспроизведена ${inter.member}... попробуйте снова ❌`,
			});

		const success = queue.node.resume();

		const resumeEmbed = new EmbedBuilder()
			.setAuthor({
				name: success
					? `Трек ${queue.currentTrack.title} возобновлен ✅`
					: `Что-то пошло не так ${inter.member}... попробуйте снова ❌`,
			})
			.setColor("#2f3136");

		return inter.editReply({ embeds: [resumeEmbed] });
	},
};
