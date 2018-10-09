const Discord = require("discord.js");
const client = new Discord.Client();

const RaidHandler = require("./RaidHandler");
const User = require("./User");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.BOT_KEY);

client.on("message", msg => {
  if (msg.content.includes("!rh")) {
    new RaidHandler(client, msg);
  }
});

client.on("message", msg => {
  if (msg.content.includes("!dd")) {
    const user = new User();
  }
});
module.exports = client;
