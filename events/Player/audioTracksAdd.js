const { EmbedBuilder } = require("discord.js");

module.exports = queue => {
	if (!client.config.app.extraMessages) return;

	(() => {
		const embed = new EmbedBuilder()
			.setAuthor({
				name: `Все песни из плейлиста добавлены в очередь ✅`,
			})
			.setColor("#2f3136");

		queue.metadata.channel.send({ embeds: [embed] });
	})();
};
