const _ = require("lodash");

class RosterHandler {
    constructor(client, msg) {
        this.client = client;
        this.msg = msg;

        this.parseString(msg.content)
    }

    parseString(msgContent) {
        const arr = msgContent.split(" ");
        console.log(arr)
        if (!arr[1]) 
            this.helpRoster();
        else if (arr[1] === "new") 
            this.createRoster(arr.splice(0, 2));
        else if (arr[1] === "add")
            this.addUser();
        else if (arr[1] === "remove")
            this.removeUser();
        else if (arr[1] === "display")
            this.displayRoster();
        else if (arr[1] === "list")
            this.listRoster();
    }

    createRoster(str) {
        if (!str[2]) {
            console.log("error");
            return;
        }
        const name = _.chain(rosterName).kebabCase().lowerCase().deburr();
        console.log(name);
    }

    helpRoster() {

        console.log("helping");
    }

    listRoster() {

    }

    createRoster() {

    }

    addUser(user, roster) {
        
    }

    removeUser(user, roster) {

    }

    displayRoster(roster) {

    }
}

module.exports = RosterHandler;
