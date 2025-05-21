const { EmbedBuilder } = require("discord.js");

module.exports = (queue, error) => {
	(async () => {
		const embed = new EmbedBuilder()
			.setAuthor({
				name: `У бота произошла непредвиденная ошибка, пожалуйста, проверьте консоль как можно скорее!`,
			})
			.setColor("#EE4B2B");

		queue.metadata.channel.send({ embeds: [embed] });

		console.log(`Ошибка, выданная проигрывателем ${error.message}`);
	})();
};
