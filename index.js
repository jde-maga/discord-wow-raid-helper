const moment = require("moment");
moment.locale("fr");

require("./mongo")
require("./server");
require("./client");