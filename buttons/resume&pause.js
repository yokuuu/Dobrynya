module.exports = async ({ inter, queue }) => {
	if (!queue?.isPlaying())
		return inter.editReply({
			content: `Музыка сейчас не играет, попробуйте снова ❌`,
		});

	const resumed = queue.node.resume();
	let message = `Текущий трек ${queue.currentTrack.title} возобновлен ✅`;

	if (!resumed) {
		queue.node.pause();
		message = `Текущий трек ${queue.currentTrack.title} остановлен ✅`;
	}

	return inter.editReply({ content: message });
};
