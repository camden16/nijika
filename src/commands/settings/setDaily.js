const { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');
const postRandomImage = require('../../utils/postRandomImage');
const { loadConfig, saveConfig } = require('../../utils/editConfig');
const { setCron, isRunning } = require('../../handlers/cronHandler');

module.exports = {
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */

    callback: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: true });

        let title = 'Daily Nijika pic! 💛';
        let schedule = interaction.options.get('time').value;


        const { isValidCron } = await import('cron-validator');
        let inputCron = '0 0 ' + schedule + ' * *';
        if (isValidCron(inputCron)) schedule = inputCron + ' *';
        else {
            await interaction.editReply("❌ That is not a valid input!");
            return;
        }

        let data = await loadConfig();
        data.dailyPostChannel = interaction.channel.id;
        data.interval = schedule;
        await saveConfig(data);

        const task = async () => {
            const channel = interaction.channel;
            const embed = (await postRandomImage(tags, 500)).setAuthor({name: title, iconURL: client.user.displayAvatarURL()});
            if (channel) {
                channel.send({ embeds: [embed] });
            }
        };
        
        await setCron(schedule, task);

        if(!isRunning()) await interaction.editReply("❌ There was an issue setting the daily channel.");
        else {
            const { toString: cronstrue } = await import('cronstrue');
            response = cronstrue(schedule).toLowerCase();
            await interaction.editReply(`✅ Daily posts will occur in this channel ${response}!`);
        }
    },


    name: 'setdaily',
    description: 'set channel for daily nijika posting',
    // devOnly: Boolean,
    // testOnly: Boolean,
    // deleted: true,

    options: [
        {
            name: 'time',
            description: 'time to set for daily posts in 00 format',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],

    permissionsRequired: [PermissionFlagsBits.ManageGuild],
    //botPermissions: [PermissionFlagsBits.ManageGuild],

};