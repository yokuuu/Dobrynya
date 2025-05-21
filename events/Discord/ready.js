module.exports = async client => {
	console.log(`Выполнен вход в систему клиента ${client.user.username}.`);
	console.log("Погнали");

	client.user.setActivity(client.config.app.playing);
};
