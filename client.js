const fs = require("fs");
const Promise = require("bluebird");
const Discord = require("discord.js");

const client = new Discord.Client();

const RaidHandler = require("./RaidHandler");
const User = require("./User");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);

  fs.readFile("./eventsID", "utf8", async (err, file) => {
    const data = JSON.parse(file);
    const newData = [];
    await Promise.all(
      data.map(async ({ channelID, messageID }) => {
        const msg = await client.channels
          .get(channelID)
          .fetchMessage(messageID)
          .catch(e => console.log(e));
        if (msg) {
          newData.push({ channelID, messageID });
          new RaidHandler(client, msg, "existing");
        }
      })
    );
    fs.writeFileSync("./eventsID", JSON.stringify(newData));
  });
});

client.login(process.env.BOT_KEY);

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
