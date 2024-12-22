const path = require('path');
const getAllFiles = require("../utils/getAllFiles");
const { priorityFiles } = require('./priority/priority.json');

module.exports = (client) => {
    const eventFolders = getAllFiles(path.join(__dirname, '..', 'events'), true);

    for (const eventFolder of eventFolders){
        const eventFiles = getAllFiles(eventFolder);


        eventFiles.sort((a,b) => {
            if (priorityFiles.includes(a.toString().replace(/\\/g, '/').split('/').pop())) return -1;
            if (priorityFiles.includes(b.toString().replace(/\\/g, '/').split('/').pop())) return 1;
            return a > b;
        });

        const eventName = eventFolder.replace(/\\/g, '/').split('/').pop();
        
        client.on(eventName, async (arg) => {
            for (const eventFile of eventFiles){
                const eventFunction = require(eventFile);
                await eventFunction(client, arg);
            }
        });
    }
};