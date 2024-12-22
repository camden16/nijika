const { EmbedBuilder } = require('discord.js');
const postRandomImage = require('../../utils/postRandomImage');

const tags = 'bocchi_the_rock! sort:score -rating:safe';


module.exports = {
    name: 'kessokunsfw',
    description: 'get a random nsfw bocchi the rock art',
    nsfwOnly: true,
    // devOnly: Boolean,
    // testOnly: Boolean,
    // options: [],
    // deleted: true,

    callback: async (client, message) => {
        let title = 'Here is a spicy Bocchi the Rock art! 💕';

        const embed = (await postRandomImage(tags, 1000)).setAuthor({name: title, iconURL: client.user.displayAvatarURL()});

        message.channel.send({ embeds: [embed] });
    },
};