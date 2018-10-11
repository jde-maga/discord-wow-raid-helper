const Discord = require("discord.js");
const client = new Discord.Client();

const classes = [
  "dk",
  "death knight",
  "dh",
  "demon hunter",
  "druid",
  "drood",
  "hunt",
  "hunter",
  "mage",
  "monk",
  "pal",
  "paladin",
  "pri",
  "priest",
  "rogue",
  "sham",
  "shaman",
  "lock",
  "wl",
  "warlock",
  "war",
  "warrior"
];

const specs = [
  {
    class: "dk",
    specs: ["blood", "uh", "unholy", "frost"]
  },
  {
    class: "dh",
    specs: ["havoc", "veng", "vengeance"]
  },
  {
    class: "druid",
    specs: [
      "balance",
      "boom",
      "moonkin",
      "feral",
      "resto",
      "restoration",
      "guardian"
    ]
  },
  {
    class: "hunter",
    specs: ["bm", "beast master", "beast mastery", "mm", "marksman", "marksmanship", "sv", "surv", "survival"]
  },
  {
    class: "mage",
    specs: ""
  }
];

class User {
  constructor() {
    this.user = null;
    this.class = null;
    this.spec = null;
  }

  error(err) {
    return {
      status: "KO",
      err
    };
  }

  getClass(str) {
    let userClass;
    classes.forEach(cls => {
      if (str.toLowerCase().includes(cls)) {
        if (userClass !== "") {
          error("You are trying to add more than one class !");
        }
        userClass = cls;
      }
    });
  }

  parseNewUser(str) {
    const tab = str.split(" ");
  }
}

module.exports = User;
