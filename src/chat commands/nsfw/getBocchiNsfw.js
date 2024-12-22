const { EmbedBuilder } = require('discord.js');
const postRandomImage = require('../../utils/postRandomImage');

const tags = 'gotoh_hitori sort:score -rating:safe';


module.exports = {
    name: 'bocchinsfw',
    description: 'get a random nsfw bocchi picture',
    nsfwOnly: true,
    // devOnly: Boolean,
    // testOnly: Boolean,
    // options: [],
    // deleted: true,

    callback: async (client, message) => {
        let title = 'Here is a spicy bocchi! 🩷';

        const embed = (await postRandomImage(tags, 500)).setAuthor({name: title, iconURL: client.user.displayAvatarURL()});

        message.channel.send({ embeds: [embed] });
    },
};