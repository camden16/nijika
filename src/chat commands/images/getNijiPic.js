const { EmbedBuilder } = require('discord.js');
const postRandomImage = require('../../utils/postRandomImage');

const tags = 'ijichi_nijika sort:score -rating:explicit -rating:questionable -rating:sensitive solo';

module.exports = {
    name: 'nijika',
    description: 'get a random nijika picture',
    // nsfwOnly: Boolean,
    // devOnly: Boolean,
    // testOnly: Boolean,
    // options: [],
    // deleted: true,

    callback: async (client, message) => {
        let title = 'Here is a random Nijika! 💛';

        const embed = (await postRandomImage(tags, 500)).setAuthor({name: title, iconURL: client.user.displayAvatarURL()});

        message.channel.send({ embeds: [embed] });
    },
};