const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        require: [true]
    },
    img: {
        type: String
    },
    googleID: {
        type: String
    },
    facebookID: {
        type: String
    },
    notes: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Note"
    }]
});

module.exports = mongoose.model("User", userSchema);