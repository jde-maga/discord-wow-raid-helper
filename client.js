const Discord = require("discord.js");

const RaidHandler = require("./RaidHandler");
const RosterHandler = require("./RosterHandler");

const RaidEvent = require("./models/RaidEvent");

const client = new Discord.Client();

client.login(process.env.BOT_KEY);

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}`);

  const eventsID = await RaidEvent.find({});
  console.log(`Found ${eventsID.length} exisiting raid entries`);

  eventsID.forEach(async event => {
    const channel = await client.channels.get(event.channelID);
    if (!channel) {
      console.log("Channel not found, removing entry");
      event.remove();
    } else {
      channel
        .fetchMessage(event.messageID)
        .then(msg => new RaidHandler(client, msg, "existing"))
        .catch(e => {
          console.log("Caught Error, removing entry : ", e);
          event.remove();
        });
    }
  });
});

client.on("message", msg => {
  if (msg.content.includes("!rh")) {
    const officerRole = msg.guild.roles.find(
      role => role.name.toLowerCase() === "rh"
    ) || { id: null };
    if (msg.member._roles.find(id => id === officerRole.id)) {
      new RaidHandler(client, msg, "new");
    } else {
      console.log(`Denied !rh to user ${msg.author.tag}`);
    }
  }
});

client.on("message", msg => {
  if (msg.content.startsWith("!roster")) {
    const officerRole = msg.guild.roles.find(
      role => role.name.toLowerCase() === "rh"
    ) || { id: null };
    if (msg.member._roles.find(id => id === officerRole.id)) {
      new RosterHandler(client, msg);
    } else {
      console.log(`Denied !roster to user ${msg.author.tag}`);
    }
  }
});

module.exports = client;
