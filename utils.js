const AWS = require('aws-sdk');
const Discord = require('discord.js');
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = require('./constants.js');

const TABLE_NAME = 'discord_reaction_events';
const INDEX_NAME = 'message_thread_id-index';
AWS.config.update({
    region: 'us-east-2',
    endpoint: 'https://dynamodb.us-east-2.amazonaws.com',
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
});
const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.saveDiscordReactionPayloadToDB = async (payload,created_thread_id) => {
    await dynamodb.put({
        TableName: TABLE_NAME,
        Item: {
            message_id: payload.message.id,
            message_content: payload.message.content,
            message_author_id: payload.message.author.id,
            message_author_username: payload.message.author.username,
            message_guild_id: payload.message.guild.id,
            message_channel_id: payload.message.channel.id,
            message_thread_id: created_thread_id
        }
    }, (err,data) =>{
        if (err) {
            console.log('saveDiscordReactionPayloadToDB',err);
        }
    }).promise();
};

module.exports.saveJiraResponsePayloadToDB = async (payload,key) => {
    await dynamodb.update({
        TableName: TABLE_NAME,
        Key: {
            message_id: key
        },
        UpdateExpression: 'set #issue_key = :issue_key, #issue_id = :issue_id',
        ExpressionAttributeNames: {
            '#issue_key': 'issue_key',
            '#issue_id': 'issue_id'
        },
        ExpressionAttributeValues: {
            ':issue_key': payload.key,
            ':issue_id' : payload.id
        },
        ReturnValues: 'UPDATED_NEW'
    }, (err,data) =>{
        if (err) {
            console.log('saveJiraResponsePayloadToDB', err);
        } 
    }).promise();
};

module.exports.queryIssueKeyFromDB = async (threadId) => {
    let issueKey = await dynamodb.query({
        TableName: TABLE_NAME,
        IndexName: INDEX_NAME, 
        KeyConditionExpression: 'message_thread_id = :message_thread_id',
        ExpressionAttributeValues: {
            ':message_thread_id': threadId
        }
    },(err,data) => {
        if (err) {
            console.log('queryIssueKeyFromDB', err);
        } 
    }).promise();
    console.log(issueKey.Items[0].issue_key);
    return issueKey.Items[0].issue_key;
};


