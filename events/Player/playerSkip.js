const { EmbedBuilder } = require("discord.js");

module.exports = (queue, track) => {
	(() => {
		const embed = new EmbedBuilder()
			.setAuthor({
				name: `Пропускаем трек ${track.title} ❌`,
			})
			.setColor("#EE4B2B");

		queue.metadata.channel.send({ embeds: [embed], iconURL: track.thumbnail });
	})();
};
