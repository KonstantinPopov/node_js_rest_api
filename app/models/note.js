var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var noteSchema = new Schema({
    value:{
        type: String,
        required: true
    },
    date: { type: Date, default: Date.now }
});


var Note = mongoose.model('Note', noteSchema);
module.exports = Note;
