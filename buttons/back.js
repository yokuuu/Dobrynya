module.exports = async ({ inter, queue }) => {
	if (!queue?.isPlaying())
		return inter.editReply({
			content: `Музыка сейчас не играет, попробуйте снова ❌`,
		});
	if (!queue.history.previousTrack)
		return inter.editReply({
			content: `Играет первый трек в очереди ${inter.member}... попробуйте снова ❌`,
		});

	await queue.history.back();

	inter.editReply({
		content: `Воспроизводится прошлый трек ✅`,
	});
};
