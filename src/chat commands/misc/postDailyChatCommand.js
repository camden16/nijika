const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const postRandomImage = require('../../utils/postRandomImage');
const { dangerColor, systemColor } = require('../../../config.json');
const { loadConfig, saveConfig } = require('../../utils/editConfig');
const { setCron, isRunning } = require('../../handlers/cronHandler');


const tags = 'ijichi_nijika sort:score -rating:explicit -rating:questionable -rating:sensitive solo';

module.exports = {
    name: 'daily',
    description: 'set channel for daily nijika posting',

    permissionsRequired: [PermissionFlagsBits.ManageGuild],
    // botPermissions: [PermissionFlagsBits.ManageGuild],
    // nsfwOnly: Boolean,
    // devOnly: Boolean,
    testOnly: true,
    // options: [],
    // deleted: true,

    callback: async (client, message, args) => {
        let title = 'Daily Nijika pic! 💛';
        let schedule;
        let responseEmbed = new EmbedBuilder();

        if(args?.length) {
            const { isValidCron } = await import('cron-validator');
            let inputCron = '0 0 ' + args[0] + ' * *';
            if (isValidCron(inputCron)) schedule = inputCron + ' *';
            else {
                responseEmbed.setColor(dangerColor).setDescription('❌ That is not a valid input!');
                message.channel.send({ embeds: [responseEmbed] });
                return;
            }
        }

        let data = await loadConfig();
        data.dailyPostChannel = message.channel.id;
        if(schedule) data.interval = schedule;
        else schedule = data.interval;
        await saveConfig(data);

        const task = async () => {
            const channel = message.channel;
            const embed = (await postRandomImage(tags, 500)).setAuthor({name: title, iconURL: client.user.displayAvatarURL()});
            if (channel) {
                channel.send({ embeds: [embed] });
            }
        };
        
        await setCron(schedule, task);

        if(!isRunning()) responseEmbed.setColor(dangerColor).setDescription('❌ There was an issue setting the daily channel.');
        else {
            const { toString: cronstrue } = await import('cronstrue');
            response = cronstrue(schedule).toLowerCase();
            responseEmbed.setColor(systemColor).setDescription(`✅ Daily posts will occur in this channel ${response}!`);
        }
        message.channel.send({ embeds: [responseEmbed] });
    },
};