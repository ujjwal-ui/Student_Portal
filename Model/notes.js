const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notesSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "User"
    },
    date: {
        type: {
            String,
            required: true
        }
    }
});

module.exports = mongoose.model("Note", notesSchema);