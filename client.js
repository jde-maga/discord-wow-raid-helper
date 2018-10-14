const Discord = require("discord.js");

const RaidHandler = require("./RaidHandler");

const RaidEvent = require("./models/RaidEvent");

const client = new Discord.Client();

client.login(process.env.BOT_KEY);

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}`);

  const eventsID = await RaidEvent.find({});
  console.log(`Found ${eventsID.length} exisiting raid entries`);

  eventsID.forEach(async event => {
    const msg = await client.channels
      .get(event.channelID)
      .fetchMessage(event.messageID)
      .catch(e => {
        console.log(`error on ${event.messageID}, deleting`, e);
        event.remove();
      });
    if (msg) new RaidHandler(client, msg, "existing");
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

module.exports = client;
