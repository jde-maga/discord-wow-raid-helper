const emoji = require("node-emoji");
const moment = require("moment");

const client = require("./client");

class RaidHandler {
  constructor(client, msg) {
    this.client = client;
    this.author = msg.author;
    this.message = null;
    this.tanks = [];
    this.healers = [];
    this.dps = [];

    this.listenReactions();
    this.createNewRaid(msg);
  }

  addUser(type, user) {
    this[type].push(user);
    console.log(`${type} - Added user ${user.tag}`);
  }

  removeUser(type, user) {
    this[type].splice(this[type].findIndex(usr => usr.id === user.id), 1);
    console.log(`${type} - Removed user ${user.tag}`);
  }

  displayRole(type) {
    let str = this[type].length ? "" : "Personne !";
    this[type].forEach(user => {
      str = str.concat(`- <@${user.id}>\n`);
    });
    return str;
  }

  generateEmbed() {
    return {
      color: "16711680",
      footer: {
        text: `Ajoutez un ${emoji.get("shield")}, ${emoji.get(
          "revolving_hearts"
        )}, ${emoji.get(
          "crossed_swords"
        )} en fonction de vos roles disponible pour participer au raid !`
      },
      fields: [
        {
          inline: true,
          name: `${emoji.get("shield")} Tanks (${this.tanks.length})`,
          value: this.displayRole("tanks")
        },
        {
          inline: true,
          name: `${emoji.get("revolving_hearts")} Healers (${
            this.healers.length
          })`,
          value: this.displayRole("healers")
        },
        {
          inline: true,
          name: `${emoji.get("crossed_swords")} DPS (${this.dps.length})`,
          value: this.displayRole("dps")
        }
      ]
    };
  }

  listenReactions() {
    this.client.on("messageReactionAdd", async (reaction, user) => {
      if (reaction.message.id !== this.message.id || user.bot) return;

      if (emoji.which(reaction.emoji.name) === "shield") {
        this.addUser("tanks", user);
      } else if (emoji.which(reaction.emoji.name) === "revolving_hearts") {
        this.addUser("healers", user);
      } else if (emoji.which(reaction.emoji.name) === "crossed_swords") {
        this.addUser("dps", user);
      }

      if (emoji.which(reaction.emoji.name) === "wave") {
        if (user.id === this.author.id) {
          const idDel = this.message.id;
          await this.message.delete();
          console.log(`Deleted raid ${idDel}`);
        }
        return;
      }
      this.editMessage();
    });

    this.client.on("messageReactionRemove", (reaction, user) => {
      if (reaction.message.id !== this.message.id || user.bot) return;

      if (emoji.which(reaction.emoji.name) === "shield") {
        this.removeUser("tanks", user);
      } else if (emoji.which(reaction.emoji.name) === "revolving_hearts") {
        this.removeUser("healers", user);
      } else if (emoji.which(reaction.emoji.name) === "crossed_swords") {
        this.removeUser("dps", user);
      }
      this.editMessage();
    });
  }

  async editMessage() {
    await this.message.edit(
      `Derniere modification : ${moment().format("Do MMMM, HH:mm:ss")}`,
      {
        embed: this.generateEmbed()
      }
    );
    console.log(`Edited raid ${this.message.id}`);
  }

  async createNewRaid(msg) {
    this.message = await msg.channel.send(
      `Derniere modification : ${moment().format("Do MMMM, HH:mm:ss")}`,
      { embed: this.generateEmbed() }
    );
    await this.message.react(emoji.get("shield"));
    await this.message.react(emoji.get("revolving_hearts"));
    await this.message.react(emoji.get("crossed_swords"));
    await this.message.react(emoji.get("wave"));
    console.log(`Created new raid, id ${this.message.id}`);
  }
}

module.exports = RaidHandler;
