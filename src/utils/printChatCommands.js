const path = require('path');
const getAllFiles = require('./getAllFiles');

module.exports = (commandExceptions = [], categoryExceptions = []) => {
    let chatCommands = '';

    const commandsCategories = getAllFiles(
        path.join(__dirname, '..', 'chat commands'),
        true
    );

    for (const commandCategory of commandsCategories){
        const commandFiles = getAllFiles(commandCategory);
        const categoryName = commandCategory.toString().replace(/\\/g, '/').split('/').pop().replace(/^./, char => char.toUpperCase());
        if (categoryExceptions.includes(categoryName.toLowerCase())) continue;
        chatCommands += '\n◻ ';
        chatCommands = chatCommands + '**' + categoryName + '**\n';

        for (const commandFile of commandFiles){
            const commandObject = require(commandFile);

            if (commandExceptions.includes(commandObject.name)) continue;
            if (commandObject.testOnly || commandObject.devOnly) continue;

            chatCommands = chatCommands + '`' + commandObject.name + '` ';
        }

        chatCommands = chatCommands.trim();
    }
    return chatCommands;
};