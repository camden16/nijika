const path = './config.json';
const fs = require('fs');

function loadConfig(){
    try {
        const data = fs.readFileSync(path);
        return JSON.parse(data);
    } catch (error) {
        console.log(`Error reading: ${error}`);
        return null;
    }
}

function saveConfig(data) {
    try {
        let jsonString = JSON.stringify(data, null, 2);
        fs.writeFileSync(path, jsonString, 'utf8');
    } catch (error) {
        console.log(`Error writing: ${error}`);
        return;
    }
    return;
}

module.exports = { loadConfig, saveConfig };