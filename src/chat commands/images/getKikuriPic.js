const { EmbedBuilder } = require('discord.js');
const postRandomImage = require('../../utils/postRandomImage');

const tags = 'hiroi_kikuri sort:score -rating:explicit -rating:questionable -rating:sensitive solo';

module.exports = {
    name: 'kikuri',
    description: 'get a random kikuri picture',
    // nsfwOnly: Boolean,
    // devOnly: Boolean,
    // testOnly: Boolean,
    // options: [],
    // deleted: true,

    callback: async (client, message) => {
        let title = 'Here is a random Kikuri! 💜';

        const embed = (await postRandomImage(tags, 200)).setAuthor({name: title, iconURL: client.user.displayAvatarURL()});

        message.channel.send({ embeds: [embed] });
    },
};