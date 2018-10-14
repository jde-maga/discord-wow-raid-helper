const mongoose = require("mongoose");

const schemaRaidEvent = new mongoose.Schema({
  messageID: "string",
  channelID: "string"
});

const modelRaidEvent = mongoose.model("RaidEvent", schemaRaidEvent);

module.exports = modelRaidEvent;
