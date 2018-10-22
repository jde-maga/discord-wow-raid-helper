const Discord = require("discord.js");
const client = new Discord.Client();

const classes = [
  {
    class: "dk",
    specs: ["blood", "unholy", "frost"]
  },
  {
    class: "dh",
    specs: ["havoc", "vengeance"]
  },
  {
    class: "druid",
    specs: [
      "balance",
      "feral",
      "restoration",
      "guardian"
    ]
  },
  {
    class: "hunter",
    specs: ["beast master", "marksman", "survival"]
  },
  {
    class: "mage",
    specs: ["arcane", "frost", "fire"]
  },
  {
      class: "monk",
      specs: ["windwalker", "mistweaver", "brewmaster"]
  },
  {
      class: "paladin",
      specs: ["holy", "protection", "retribution"]
  },
  {
      class: "priest",
      specs: ["discipline", "holy", "shadow"]
  },
  {
      class: "rogue",
      specs: ["assassination", "outlaw", "subtlety"]
  },
  {
      class: "warlock",
      specs: ["affliction", "destruction", "demonology"]
  },
  {
      class: "warrior",
      specs: ["arms", "fury", "protection"]
  }
];

class User {
  constructor() {
    this.user = null;
    this.class = null;
    this.spec = null;
  }
}

module.exports = User;
