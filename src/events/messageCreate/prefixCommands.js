const { Client, Message, EmbedBuilder } = require('discord.js');
const { prefix, devs, testChannels, dangerColor } = require('../../../config.json');
const getChatCommands = require('../../utils/getChatCommands');

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */

module.exports = async (client, message) => {
    if (!message.inGuild() || message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const chatCommands = getChatCommands();

    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let command = args.shift().toLowerCase();

    try{
        const commandObject = chatCommands.find(
            (cmd) => cmd.name === command
        );

        if (!commandObject) return;

        const embed = new EmbedBuilder().setColor(dangerColor);

        if (commandObject.devOnly) {
            if (!devs.includes(message.member.id)) {
                embed.setDescription('❌ This command is for developers only!');
                message.channel.send({
                    embeds: [embed]
                });
                return;
            }
        }

        if (commandObject.testOnly) {
            if (!testChannels.includes(message.channel.id)) {
                embed.setDescription('❌ This command can only be used in testing channels!');
                message.channel.send({
                    embeds: [embed]
                });
                return;
            }
        }

        if (commandObject.nsfwOnly) {
            if (!message.channel.nsfw) {
                embed.setDescription('❌ This is not a NSFW channel!');
                message.channel.send({
                    embeds: [embed]
                });
                return;
            }
        }

        if (commandObject.permissionsRequired?.length) {
            for ( const permission of commandObject.permissionsRequired) {
                if (!message.member.permissions.has(permission)) {
                    embed.setDescription('❌ You do not have the required permissions to use this command!');
                    message.channel.send({
                        embeds: [embed]
                    });
                    return;
                }
            }
        }

        if (commandObject.botPermissions?.length) {
            for ( const permission of commandObject.botPermissions) {
                const bot = message.guild.members.me;

                if (!bot.permissions.has(permission)) {
                    embed.setDescription('❌ The bot lacks the required permissions to use this command!');
                    message.channel.send({
                        embeds: [embed]
                    });
                    return;
                }
            }
        }

        await commandObject.callback(client, message, args);

    } catch (error) {
        console.log(`Error running chat command: ${error}.`);
    }
}