const { EmbedBuilder } = require('discord.js');
const postRandomImage = require('../../utils/postRandomImage');

const tags = 'bocchi_the_rock! sort:score -rating:explicit -rating:questionable -rating:sensitive';

module.exports = {
    name: 'kessoku',
    description: 'get a random bocchi the rock art',
    // nsfwOnly: Boolean,
    // devOnly: Boolean,
    // testOnly: Boolean,
    // options: [],
    // deleted: true,

    callback: async (client, message) => {
        let title = 'Here is a random Bocchi the Rock Art! 💕';

        const embed = (await postRandomImage(tags, 1000)).setAuthor({name: title, iconURL: client.user.displayAvatarURL()});

        message.channel.send({ embeds: [embed] });
    },
};