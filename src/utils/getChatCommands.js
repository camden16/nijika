const path = require('path');
const getAllFiles = require('./getAllFiles');

module.exports = (exceptions = []) => {
    let chatCommands = [];

    const commandsCategories = getAllFiles(
        path.join(__dirname, '..', 'chat commands'),
        true
    );

    for (const commandCategory of commandsCategories){
        const commandFiles = getAllFiles(commandCategory);

        for (const commandFile of commandFiles){
            const commandObject = require(commandFile);

            if (exceptions.includes(commandObject.name)) continue;

            chatCommands.push(commandObject);
        }
    }
    return chatCommands;
};