const mongoose = require("mongoose");

const schemaRoster = new mongoose.Schema({
  guildID: "string",
  name: "string",
  tanks: "array",
  healers: "array",
  dps: "array"
});

const modelRoster = mongoose.model("Roster", schemaRoster);

module.exports = modelRoster;
