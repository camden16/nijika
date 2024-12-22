const { EmbedBuilder } = require('discord.js');
const postRandomImage = require('../../utils/postRandomImage');

const tags = 'pa-san sort:score -rating:explicit -rating:questionable -rating:sensitive solo';

module.exports = {
    name: 'pa',
    description: 'get a random pa-san picture',
    // nsfwOnly: Boolean,
    // devOnly: Boolean,
    // testOnly: Boolean,
    // options: [],
    // deleted: true,

    callback: async (client, message) => {
        let title = 'Here is a random PA-san! 🖤';

        const embed = (await postRandomImage(tags, 50)).setAuthor({name: title, iconURL: client.user.displayAvatarURL()});

        message.channel.send({ embeds: [embed] });
    },
};