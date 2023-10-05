const Users = require("./users");
const Vehicles = require("./vehicles");
module.exports = function (app) {
    app.use("/api/users", Users);
    app.use("/api/vehicles", Vehicles);

};
