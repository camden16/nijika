const { Client, Interaction, PermissionFlagsBits } = require('discord.js');
const { loadConfig } = require('../../utils/editConfig');

module.exports = {
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */

    callback: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: true });
        const data = await loadConfig();

        if (!data.dailyPostChannel) {
            await interaction.editReply("❌ There is no daily post currently set!");
            return;
        }

        channel = client.channels.cache.get(data.dailyPostChannel);
        schedule = data.interval;

        const { toString: cronstrue } = await import('cronstrue');
        response = cronstrue(schedule).toLowerCase();

        await interaction.editReply(`Daily posts are set to occur in ${channel.name} ${response}!`);
    },


    name: 'dailyinfo',
    description: 'check the status of the daily post',
    // devOnly: Boolean,
    // testOnly: Boolean,
    // deleted: true,

    permissionsRequired: [PermissionFlagsBits.ManageGuild],
    //botPermissions: [PermissionFlagsBits.ManageGuild],

};