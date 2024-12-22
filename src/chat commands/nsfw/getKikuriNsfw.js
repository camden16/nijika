const { EmbedBuilder } = require('discord.js');
const postRandomImage = require('../../utils/postRandomImage');

const tags = 'hiroi_kikuri sort:score -rating:safe';


module.exports = {
    name: 'kikurinsfw',
    description: 'get a random nsfw kikuri picture',
    nsfwOnly: true,
    // devOnly: Boolean,
    // testOnly: Boolean,
    // options: [],
    // deleted: true,

    callback: async (client, message) => {
        let title = 'Here is a spicy Kikuri! 💜';

        const embed = (await postRandomImage(tags, 500)).setAuthor({name: title, iconURL: client.user.displayAvatarURL()});

        message.channel.send({ embeds: [embed] });
    },
};