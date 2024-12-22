const { Client, Message, MessageMentions } = require('discord.js');
const { Groq } = require('groq-sdk');
const { prefix, devs } = require('../../../config.json');
const { prompt } = require('../../../prompt.json');

const groq = new Groq({ apiKey: process.env.GROQAI_KEY });

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */

module.exports = async (client, message) => {
    return;
    if (message.author.bot) return;
    if (message.content.startsWith(prefix)) return;
    if (!message.mentions.users.has(client.user.id)) return;

    let conversation = [];

    conversation.push({
        role: 'system',
        content: prompt,
    });

    message.channel.sendTyping();

    const sendTypingInterval = setInterval(() => {
        message.channel.sendTyping();
    }, 5000);

    let prevMessages = await message.channel.messages.fetch({ limit: 30 });
    prevMessages.reverse();

    prevMessages.forEach((pMessage) => {
        if (pMessage.author.bot && pMessage.author.id != client.user.id) return;
        if (message.content.startsWith(prefix)) return;

        let username = pMessage.member?.displayName.replace(/\s+/g, '_').replace(/[^\w\s]/gi, '') || 'unknown_user';

        if (pMessage.author.id === client.user.id) {
            username = 'Me';
        }

        let logMessage = pMessage.content;

        if(pMessage.stickers.size == 1){
            if(logMessage) logMessage += " ";
            logMessage += "[Sent a sticker]: " + pMessage.stickers.at(0).name;
        }

        if(pMessage.attachments.size > 0){
            if(logMessage) logMessage += " ";
            logMessage += "[Added attatchment]: " + pMessage.attachments.first().url;
        }

        if (pMessage.mentions.users.size > 0) {
            pMessage.mentions.parsedUsers.forEach((mentionedUser) => {
                logMessage = MentionToName(logMessage, mentionedUser.id, mentionedUser.displayName, client);
            });
        }

        //console.log(username);
        //console.log(logMessage);


        if(pMessage.author.id === client.user.id) {
            conversation.push({
                role: 'assistant',
                name: username,
                content: pMessage.content,
                
            });
            return;
        }

        conversation.push({
            role: 'user',
            name: username,
            content: "[" + username + "]: " + logMessage,
        });
    })

    const response = await groq.chat.completions
    .create({
        model: 'llama3-70b-8192',
        messages: conversation,
        stream: true,
    })
    .catch(error => console.error('GroqAI Error: \n', error));

    clearInterval(sendTypingInterval);

    if (!response) {
        message.reply("Uhh, could you say that again?");
        return;
    }

    let fullResponse = "";
    try {
        for await (const chunk of response){
            fullResponse += chunk.choices[0]?.delta?.content || "";
        }
    } catch (error) {
        console.log(`Error occured: ${error}`);
    }

    if (!fullResponse) {
        message.reply("Ummm, I'm having some trouble right now...");
        return;
    }

    const chunkSize = 2000;
    const messageChunk = fullResponse.substring(0, chunkSize);

    await message.reply({
        content: messageChunk,
        allowedMentions: { repliedUser: false }
    });
}

function MentionToName(message, userId, username, client){
    const mentionString = "<@" + userId + ">";
    if (userId === client.user.id) username = "you";
    return message.replace(mentionString, username).trim();
}