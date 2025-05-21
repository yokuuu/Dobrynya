const { EmbedBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
	name: "stop",
	description: "Остановить музыку",
	voiceChannel: true,

	async execute({ inter }) {
		const queue = useQueue(inter.guild);
		if (!queue?.isPlaying())
			return inter.editReply({
				content: `Музыка сейчас не играет ${inter.member}... попробуйте снова ❌`,
			});

		queue.delete();

		const embed = new EmbedBuilder().setColor("#2f3136").setAuthor({
			name: `Музыка остановлена ✅`,
		});

		return inter.editReply({ embeds: [embed] });
	},
};
