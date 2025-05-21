const { EmbedBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
	name: "skip",
	description: "Пропустить трек",
	voiceChannel: true,

	async execute({ inter }) {
		const queue = useQueue(inter.guild);
		if (!queue?.isPlaying())
			return inter.editReply({
				content: `Музыка сейчас не играет ${inter.member}... попробуйте снова ❌`,
			});

		const success = queue.node.skip();

		const embed = new EmbedBuilder().setColor("#2f3136").setAuthor({
			name: success
				? `Трек ${queue.currentTrack.title} пропущен ✅`
				: `Что-то пошло не так ${inter.member}... попробуйте снова ❌`,
		});

		return inter.editReply({ embeds: [embed] });
	},
};
