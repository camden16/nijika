const { ActivityType } = require("discord.js");

module.exports = (client) => {
    client.user.setActivity({
        name: 'Drums',
        type: ActivityType.Playing,
    });
};