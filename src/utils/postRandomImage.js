const { EmbedBuilder } = require('discord.js');
const Gelbooru = require(`gelbooru-api`);
const { systemColor, dangerColor } = require('../../config.json');

module.exports = async (tags, limit) => {
    let reply = 'No source found!'
    let image = 'https://img3.gelbooru.com/images/d0/eb/d0ebf38ada27d1e6c7df8aebb4bc6768.jpg';
    let footer = 'No source found!';
    let url = image;

    const post = await getRandomImage(tags, limit);
        
    image = post.file_url;
    if (post.source) { 
        reply = 'Source: ' + post.source;
        url = post.source;
    }
    footer = 'Id: ' + post.id;


    if (!post.id) return new EmbedBuilder()
    .setDescription('❌ Could not find an image based on that query!')
    .setColor(dangerColor);

    return new EmbedBuilder()
    .setDescription(reply)
    .setColor(systemColor)
    .setImage(image)
    .setFooter({ text: footer });
};

function getRandomImage(tags, limit) {
    const GelbooruClient = new Gelbooru(tags);
    return GelbooruClient.getRandomPost(tags, limit, 0);
}