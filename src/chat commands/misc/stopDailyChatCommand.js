const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { dailyPostChannel, dangerColor, systemColor } = require('../../../config.json');
const { loadConfig, saveConfig } = require('../../utils/editConfig');
const { isRunning, stopCron } = require('../../handlers/cronHandler');


const tags = 'ijichi_nijika sort:score -rating:explicit -rating:questionable -rating:sensitive solo';

module.exports = {
    name: 'stopdaily',
    description: 'stop daily nijika posting',

    permissionsRequired: [PermissionFlagsBits.ManageGuild],
    // botPermissions: [PermissionFlagsBits.ManageGuild],
    // nsfwOnly: Boolean,
    // devOnly: Boolean,
    testOnly: true,
    // options: [],
    // deleted: true,

    callback: async (client, message) => {
        let embed = new EmbedBuilder();

        if(!isRunning()){
            embed.setColor(dangerColor).setDescription('❌ There are no daily posts to stop!');
            message.channel.send({ embeds: [embed] });
            return;
        }

        stopCron();

        const data = await loadConfig();
        data.dailyPostChannel = '';
        await saveConfig(data);

        embed.setColor(systemColor).setDescription('✅ Daily posts will no longer occur in this channel!');
        message.channel.send({ embeds: [embed] });
    },
};