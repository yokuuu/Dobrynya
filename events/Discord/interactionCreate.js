const { EmbedBuilder, InteractionType, MessageFlags } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = async (client, inter) => {
	await inter.deferReply({ flags: MessageFlags.Ephemeral });
	if (inter.type === InteractionType.ApplicationCommand) {
		const DJ = client.config.opt.DJ;
		const command = client.commands.get(inter.commandName);

		const errorEmbed = new EmbedBuilder().setColor("#ff0000");

		if (!command) {
			errorEmbed.setDescription("❌ | Ошибка");
			inter.editReply({ embeds: [errorEmbed], flags: MessageFlags.Ephemeral });
			return client.slash.delete(inter.commandName);
		}

		if (
			command.permissions &&
			!inter.member.permissions.has(command.permissions)
		) {
			errorEmbed.setDescription(
				`❌ | Вам нужны соответствующие разрешения для выполнения этой команды.`
			);
			return inter.editReply({
				embeds: [errorEmbed],
				flags: MessageFlags.Ephemeral,
			});
		}

		if (
			DJ.enabled &&
			DJ.commands.includes(command) &&
			!inter.member._roles.includes(
				inter.guild.roles.cache.find(x => x.name === DJ.roleName).id
			)
		) {
			errorEmbed.setDescription(
				`❌ | Эта команда зарезервирована для участников с ролью \`${DJ.roleName}\` `
			);
			return inter.editReply({
				embeds: [errorEmbed],
				flags: MessageFlags.Ephemeral,
			});
		}

		if (command.voiceChannel) {
			if (!inter.member.voice.channel) {
				errorEmbed.setDescription(`❌ | Вы не находитесь в голосовом канале`);
				return inter.editReply({
					embeds: [errorEmbed],
					flags: MessageFlags.Ephemeral,
				});
			}

			if (
				inter.guild.members.me.voice.channel &&
				inter.member.voice.channel.id !==
					inter.guild.members.me.voice.channel.id
			) {
				errorEmbed.setDescription(
					`❌ | Вы не находитесь в том же голосовом канале`
				);
				return inter.editReply({
					embeds: [errorEmbed],
					flags: MessageFlags.Ephemeral,
				});
			}
		}

		command.execute({ inter, client });
	} else if (inter.type === InteractionType.MessageComponent) {
		const customId = inter.customId;
		if (!customId) return;

		const queue = useQueue(inter.guild);
		const path = `../../buttons/${customId}.js`;

		delete require.cache[require.resolve(path)];
		const button = require(path);
		if (button) return button({ client, inter, customId, queue });
	}
};
