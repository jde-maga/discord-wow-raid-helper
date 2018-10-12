const fs = require("fs");
const emoji = require("node-emoji");
const moment = require("moment");

const client = require("./client");

class RaidHandler {
  constructor(client, msg, type) {
    this.client = client;
    this.message = null;
    this.tanks = [];
    this.healers = [];
    this.dps = [];

    if (type === "new") {
      this.createNewRaid(msg);
    } else if (type === "existing") {
      this.message = msg;
      this.hookRaid();
    }
    this.listenReactions();
  }

  async hookRaid() {
    await this.message.reactions
      .get(emoji.get("revolving_hearts"))
      .fetchUsers()
      .then(users => {
        this.healers = users
          .map(user => {
            if (user.bot) return;
            return this.client.users.get(user.id);
          })
          .filter(e => e);
      });
    await this.message.reactions
      .get(emoji.get("shield"))
      .fetchUsers()
      .then(users => {
        this.tanks = users
          .map(user => {
            if (user.bot) return;
            return this.client.users.get(user.id);
          })
          .filter(e => e);
      });
    await this.message.reactions
      .get(emoji.get("crossed_swords"))
      .fetchUsers()
      .then(users => {
        this.dps = users
          .map(user => {
            if (user.bot) return;
            return this.client.users.get(user.id);
          })
          .filter(e => e);
      });
    this.editMessage();
    console.log(`Hooking up existing raid, ID ${this.message.id}`);
  }

  addUser(type, user) {
    if (this[type].find(e => e.id === user.id)) {
      console.log(`${type} - user ${user.tag} already in group`);
    } else {
      this[type].push(user);
      console.log(`${type} - Added user ${user.tag}`);
    }
  }

  removeUser(type, user) {
    if (this[type].find(e => e.id === user.id)) {
      this[type].splice(this[type].findIndex(usr => usr.id === user.id), 1);
      console.log(`${type} - Removed user ${user.tag}`);
    } else {
      console.log(`${type} - user ${user.tag} not in group`);
    }
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

    fs.readFile("eventsID", "utf8", (err, file) => {
      const data = JSON.parse(file);
      fs.writeFileSync(
        "./eventsID",
        JSON.stringify([
          ...data,
          {
            messageID: this.message.id,
            channelID: this.message.channel.id
          }
        ])
      );
    });

    console.log(`Created new raid, id ${this.message.id}`);
  }
}

module.exports = RaidHandler;
