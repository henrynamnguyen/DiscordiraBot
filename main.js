const { DISCORD_BOT_TOKEN, FORGE_WEBTRIGGER_URL } = require('./constants.js');
const { saveDiscordReactionPayloadToDB, saveJiraResponsePayloadToDB, queryIssueKeyFromDB } = require('./utils.js');
const Discord = require('discord.js');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const aws = require('aws-sdk');
const fetch = require('node-fetch');


const client = new Discord.Client({
    intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING, Discord.Intents.FLAGS.GUILD_INTEGRATIONS]
});

client.once('ready', async (data) => {
    // const response = data.fetchGuildPreview(client.guilds.cache.first())
    //                      .then(guild => {console.log(guild)});
    console.log('Discordira is active');
    console.log(data);
});

client.on('messageReactionAdd',async (data)=>{
    
    if (data._emoji.name === '🎫' || data._emoji.name === '🎟️') {
        const channel = await client.channels.fetch(data.message.channel.id);
        const thread = await channel.threads.create({
            name: `Ticket by ${data.message.author.username}${data.message.author.discriminator}`,
            autoArchiveDuration: 60,
            reason: 'IT support',
        });
        console.log(`thread created ${thread.id}`);

        const payload = {
            type: 'TICKET_INITIATED',
            message_id: data.message.id,
            message_content: data.message.content,
            message_author_id: data.message.author.id,
            message_author_username: data.message.author.username,
            message_guild_id: data.message.guild.id,
            message_channel_id: data.message.channel.id,
            message_thread_id: thread.id
        };
        const response = await fetch(FORGE_WEBTRIGGER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const responseFromForge = await response.json();
        console.log(responseFromForge);
        
        const buttonRow = new MessageActionRow().addComponents(
            new MessageButton().setCustomId('success').setLabel('Close Ticket').setStyle('SUCCESS')
        );
        const embed = new MessageEmbed().setTitle(`${data.message.content}`).setDescription('Assigned to: Henry').setColor('ORANGE');
        thread.send({
            content: `[Opened] Ticket ${responseFromForge.key}`,
            components: [buttonRow],
            embeds: [embed]
        });
        thread.send(`The conversation in this thread will be sync with the ticket`);
        
        await saveDiscordReactionPayloadToDB(data,thread.id);
        await saveJiraResponsePayloadToDB(responseFromForge,data.message.id);
    } 
    else if (data._emoji.name === '🔒') {
        console.log('Locked');
    }
});

client.on('messageCreate', async (data) => {
    const thread = await client.channels.fetch(data.channel.id);
    if (!thread.isThread()) {
        return;
    }
    if (data.author.bot) { 
        return;
    }
    
    const issueKey = await queryIssueKeyFromDB(thread.id);
    const payload = {
        type: 'TICKET_COMMENTED',
        message_id: data.id,
        message_content: data.content,
        message_author_id: data.author.id,
        message_author_username: data.author.username,
        message_thread_id: data.channel.id,
        issue_key: issueKey
    };
    const response = await fetch(FORGE_WEBTRIGGER_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    const responseFromForge = await response.json();
    console.log(responseFromForge);

});

client.on('interactionCreate',async (interaction) => {
    console.log(interaction);
	const thread = await client.channels.fetch(interaction.channel.id);
    if (!interaction.isButton() || !thread.isThread()) { 
        return; 
    }
    const issueKey = await queryIssueKeyFromDB(thread.id);
    const startingMessage = await thread.messages.fetch(interaction.message.id);
    const editedStartingMessage = await startingMessage.edit({
        content: `[Closed] Ticket ${issueKey}`,
        components: [],
        embeds: []
    });
    
});

client.login(DISCORD_BOT_TOKEN);