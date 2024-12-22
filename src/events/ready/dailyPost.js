const { EmbedBuilder } = require('discord.js');
const postRandomImage = require('../../utils/postRandomImage');
const { loadConfig } = require('../../utils/editConfig');
const { setCron } = require('../../handlers/cronHandler');

const tags = 'ijichi_nijika sort:score -rating:explicit -rating:questionable -rating:sensitive solo';

module.exports = async (client) => {
    let title = 'Daily Nijika pic! 💛';

    const data = loadConfig();

    if (data.dailyPostChannel && data.interval) {
        channel = client.channels.cache.get(data.dailyPostChannel);
        schedule = data.interval;

        const task = async () => {
            const embed = (await postRandomImage(tags, 500)).setAuthor({name: title, iconURL: client.user.displayAvatarURL()});
            if (channel) {
                channel.send({ embeds: [embed] });
            }
        };

        await setCron(schedule, task);

        console.log(`Daily post resumed at channel: ${channel}`);
    }
    

};