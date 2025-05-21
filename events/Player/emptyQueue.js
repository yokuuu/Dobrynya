const { EmbedBuilder } = require("discord.js");

module.exports = queue => {
	(() => {
		const embed = new EmbedBuilder()
			.setAuthor({ name: "Очередь пуста  ❌" })
			.setColor("#2f3136");

		queue.metadata.channel.send({ embeds: [embed] });
	})();
};
