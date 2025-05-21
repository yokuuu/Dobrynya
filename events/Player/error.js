const { EmbedBuilder } = require("discord.js");

module.exports = (queue, error) => {
	(() => {
		const embed = new EmbedBuilder()
			.setAuthor({
				name: `У бота произошла непредвиденная ошибка`,
			})
			.setColor("#EE4B2B");

		queue.metadata.channel.send({ embeds: [embed] });

		console.log(`Ошибка, выданная ботом ${error}`);
	})();
};
