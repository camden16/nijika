const { EmbedBuilder } = require('discord.js');
const { dangerColor } = require('../../../config.json');
const postRandomImage = require('../../utils/postRandomImage');
const nsfwTags = ['rating:explicit', 'rating:questionable', 'rating:sensitive', '-rating:safe', '-rating:general'];

module.exports = {
    name: 'search',
    description: 'search a random image on gelbooru by tags',
    // nsfwOnly: Boolean,
    // devOnly: Boolean,
    // testOnly: Boolean,
    // options: [],
    // deleted: true,

    callback: async (client, message, args) => {
        let title = 'Here\'s a random image based on your query! 💛';
        let tags = args.join(' ');
        let embed;

        if(!message.channel.nsfw){
            tags += ' -rating:explicit -rating:questionable -rating:sensitive';
            if(args.some(arg => nsfwTags.includes(arg))) {
                embed = new EmbedBuilder()
                .setDescription('❌ You can\'t use nsfw tags here, ara ara~')
                .setColor(dangerColor);
            }
        }

        if(!embed) embed = (await postRandomImage(tags, 50));
        if(embed.footer) embed.setAuthor({name: title, iconURL: client.user.displayAvatarURL()});

        message.channel.send({ embeds: [embed] });
    },
};