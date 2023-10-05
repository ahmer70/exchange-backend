const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema({
    modal: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    phone_no: {
        type: Number,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    pictures: {
        type: Array,
        required: true,
    },

});

const Vehicle = mongoose.model("Vehicle", VehicleSchema);

module.exports = Vehicle;