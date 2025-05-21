const { EmbedBuilder } = require("discord.js");

module.exports = (queue, track) => {
	if (!client.config.app.extraMessages) return;

	(() => {
		const embed = new EmbedBuilder()
			.setAuthor({
				name: `Трек ${track.title} добавлен в очередь ✅`,
				iconURL: track.thumbnail,
			})
			.setColor("#2f3136");

		queue.metadata.channel.send({ embeds: [embed] });
	})();
};
