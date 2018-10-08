const Discord = require("discord.js");
const client = new Discord.Client();

const RaidHandler = require("./RaidHandler");
const User = require("./User");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login("NDk0ODc2OTYyNzE2Nzc4NDk3.Do56Bw.l-OC0yqIbofq5QnO9UxSB6c8A38");

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
