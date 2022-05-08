require('dotenv').config();
module.exports = {
    DISCORD_BOT_TOKEN: process.env.DISCORD_BOT_TOKEN,
    DISCORD_PUBLIC_KEY: process.env.DISCORD_PUBLIC_KEY,
    DISCORD_BOT_ID: process.env.DISCORD_BOT_ID,
    FORGE_WEBTRIGGER_URL: process.env.FORGE_WEBTRIGGER_URL,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_KEY
};
