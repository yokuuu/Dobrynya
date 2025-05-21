const { QueueRepeatMode } = require("discord-player");

module.exports = async ({ inter, queue }) => {
	const methods = ["disabled", "track", "queue"];
	if (!queue?.isPlaying())
		return inter.editReply({
			content: `Музыка сейчас не играет, попробуйте снова ❌`,
		});

	if (queue.repeatMode === 2) queue.setRepeatMode(QueueRepeatMode.OFF);
	else queue.setRepeatMode(queue.repeatMode + 1);

	return inter.editReply({
		content: `Повтор был установлен на **${methods[queue.repeatMode]}**.✅`,
	});
};
