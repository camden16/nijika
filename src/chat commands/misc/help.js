const { EmbedBuilder, Message, Chann } = require('discord.js');
const { prefix, systemColor } = require('../../../config.json');
const getChatCommands = require('../../utils/getChatCommands');
const printChatCommands = require('../../utils/printChatCommands');
const ignoreCommands = [ 'help' ];

module.exports = {
    name: 'help',
    description: 'get info about chat commands',
    // devOnly: Boolean,
    // testOnly: Boolean,
    // options: [],
    // deleted: true,

    callback: async (client, message, args) => {
        let ignoreCategories = [ 'misc' ];
        const chatCommands = getChatCommands();
        let title = 'Command list';
        let reply = 'List of commands for ' + client.user.username + '~\nUse \`' + prefix + ' help {command name}\` for more information on a specific command.\n';

        if(!args.length) {
            if(!message.channel.nsfw)
                ignoreCategories.push('nsfw');
            reply += printChatCommands(ignoreCommands, ignoreCategories);
        }

        if (args?.length) {
            const commandObject = chatCommands.find(
                (cmd) => cmd.name === args[0]
            );
            if (!commandObject) {
                message.channel.send('❌ Could not find command');
                return;
            }
            title = 'Information for ' + prefix + ' ' + commandObject.name;
            reply = commandObject.description;
        }

        const embed = new EmbedBuilder()
        .setAuthor({name: title, iconURL: message.author.displayAvatarURL()})
        .setDescription(reply)
        .setColor(systemColor);

        message.channel.send({ embeds: [embed] });
    },
};