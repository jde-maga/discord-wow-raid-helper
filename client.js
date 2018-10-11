const Discord = require("discord.js");
const client = new Discord.Client();

const RaidHandler = require("./RaidHandler");
const User = require("./User");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
  const channels = client.channels.filter(channel => channel.type === "text");
  //console.log(channels.keys());
  channels.forEach(channel => {
    channel
      .fetchMessages({ limit: 1 })
      .then(msg => console.log(msg))
      .catch(e => console.log("ko"));
  });
  //console.log(channels.map(channel => channel));
  // console.log(channels["492749024894386176"].fetchMessages({ limit: 2 }));
});

client.login(process.env.BOT_KEY);

client.on("message", msg => {
  if (msg.content.includes("!rh")) {
    const officerRole = msg.guild.roles.find(
      role => role.name.toLowerCase() === "rh"
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
