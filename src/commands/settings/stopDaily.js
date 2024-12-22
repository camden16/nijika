const { Client, Interaction, PermissionFlagsBits } = require('discord.js');
const postRandomImage = require('../../utils/postRandomImage');
const { loadConfig, saveConfig } = require('../../utils/editConfig');
const { stopCron, isRunning } = require('../../handlers/cronHandler');

module.exports = {
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */

    callback: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: true });

        if(!isRunning()){
            await interaction.editReply("❌ There are no daily posts to stop!");
            return;
        }

        stopCron();

        const data = await loadConfig();
        data.dailyPostChannel = '';
        await saveConfig(data);

        await interaction.editReply("✅ Daily posts will no longer occur in this channel!");
    },


    name: 'stopdaily',
    description: 'stop daily nijika posting',
    // devOnly: Boolean,
    // testOnly: Boolean,
    // deleted: true,

    permissionsRequired: [PermissionFlagsBits.ManageGuild],
    //botPermissions: [PermissionFlagsBits.ManageGuild],

};