const Discord = require("discord.js");
const client = new Discord.Client();

const RaidHandler = require("./RaidHandler");
const User = require("./User");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.login(process.env.BOT_KEY);

client.on("message", msg => {
  if (msg.content.includes("!rh")) {
    const officerRole = msg.guild.roles.find(
      role => role.name.toLowerCase() === "officier"
    ) || { id: null };
    if (msg.member._roles.find(id => id === officerRole.id)) {
      new RaidHandler(client, msg);
    } else {
      console.log(`Denied !rh to user ${msg.author.tag}`);
    }
  }
});

//client.on("message", msg => {
//  if (msg.content.includes("!dd")) {
//   const user = new User();
//  }
//});

module.exports = client;
