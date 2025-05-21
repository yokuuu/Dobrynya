const { EmbedBuilder } = require("discord.js");

module.exports = queue => {
	if (queue.metadata.lyricsThread) {
		queue.metadata.lyricsThread.delete();
		queue.setMetadata({
			channel: queue.metadata.channel,
		});
	}

	(() => {
		const embed = new EmbedBuilder()
			.setAuthor({
				name: `В голосовом канале никого нет, покидаем голосовой канал! ❌`,
			})
			.setColor("#2f3136");

		queue.metadata.channel.send({ embeds: [embed] });
	})();
};
