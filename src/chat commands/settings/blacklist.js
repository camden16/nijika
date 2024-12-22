const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { systemColor, dangerColor } = require('../../../config.json');
const { loadConfig, saveConfig } = require('../../utils/editConfig');

module.exports = {
    name: 'blacklist',
    description: 'blacklist a tag for all image commands',

    permissionsRequired: [PermissionFlagsBits.ManageGuild],
    // botPermissions: [PermissionFlagsBits.ManageGuild],
    // nsfwOnly: Boolean,
    // devOnly: Boolean,
    // testOnly: true,
    // options: [],
    // deleted: true,

    callback: async (client, message, args) => {
        let embed = new EmbedBuilder();
        const data = await loadConfig();

        if(!args?.length){
            blacklistedTags = '\`' + data.blacklistedTags.join(', ') + '\`';
            embed.setColor(dangerColor).setDescription(`Blacklisted tags: ${blacklistedTags}`);
            message.channel.send({ embeds: [embed] });
            return;
        }

        blacklistTags = args.join(', ');
        for (const tag of args) {
            if(data.blacklistedTags.includes(tag)) continue;
            data.blacklistedTags.push(tag);
        }

        saveConfig(data);

        embed.setColor(systemColor).setDescription(`✅ Blacklisted tags: ${blacklistTags}`);
        message.channel.send({ embeds: [embed] });
    },
};