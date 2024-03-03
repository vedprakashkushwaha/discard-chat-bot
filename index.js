const OpenAI = require("openai");
const { Client, Intents, MessageMentions } = require('discord.js');

var chat = ""
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getRes(content) {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: content }],
    model: "gpt-3.5-turbo-0125",
  });
  return chatCompletion.choices[0].message.content
}

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
  try {
    chat += `${message.author.username}: ${message.content}\n`
    chat = chat.substring(chat.length - 4000)
    if (message.author.bot) return;
    if (message.mentions.users.size > 0 && !message.mentions.has(client.user)) {

    } else {
      const data = await getRes(`${chat}`)
      message.reply(data);
    }
  } catch (err) {
    console.log(err)
  }
});

client.login(process.env.DISCORD_CLIENT_TOKEN);
