const Users = require("./users");
const Exchange = require("./exchange");
module.exports = function (app) {
    app.use("/api/users", Users);
    app.use("/api/exchange", Exchange);

};
