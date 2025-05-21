module.exports = async ({ inter, queue }) => {
	if (!queue?.isPlaying())
		return inter.editReply({
			content: `Музыка сейчас не играет, попробуйте снова ❌`,
		});

	const success = queue.node.skip();

	return inter.editReply({
		content: success
			? `Трек ${queue.currentTrack.title} пропущен ✅`
			: `Что-то пошло не так ${inter.member}... попробуйте снова ❌`,
	});
};
