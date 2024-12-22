const { EmbedBuilder } = require('discord.js');
const postRandomImage = require('../../utils/postRandomImage');

const tags = 'gotoh_hitori sort:score -rating:explicit -rating:questionable -rating:sensitive solo';

module.exports = {
    name: 'bocchi',
    description: 'get a random bocchi picture',
    // nsfwOnly: Boolean,
    // devOnly: Boolean,
    // testOnly: Boolean,
    // options: [],
    // deleted: true,

    callback: async (client, message) => {
        let title = 'Here is a random Bocchi! 🩷';

        const embed = (await postRandomImage(tags, 500)).setAuthor({name: title, iconURL: client.user.displayAvatarURL()});

        message.channel.send({ embeds: [embed] });
    },
};