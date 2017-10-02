var models = require("../models");

function getNotes(req, res) {
    models.Note.find({}, function(err, notes) {
        let noteMap = {};
        if (err) {
            res.send({status: 'Error', error: err.message});
        } else {
            notes.forEach(function(note) {
                noteMap[note._id] = {note: note.value, date: note.date};
            });
            res.send({status: 'Success', data: noteMap});
        }
    });
}

function getNoteById(req, res) {
    let id = req.params.id;
    models.Note.findOne({_id: id}, function(err, note) {
        if (err) {
            res.send({status: 'Error', error: err.message});
        } else {
            res.send({status: 'Success', data: {note: note.value, date: note.date}});
        }
    });
}
function createNote(req, res) {
    if ((req.headers['content-type'] || 'application/json') !== 'application/json') {
        let contentType = req.headers['content-type'];
        res.send({status: 'Error', error: 'Not valid content Type: ' + contentType})
        return;
    }
    let note = {value: req.body.note, date: Date.now()};
    note = new models.Note(note);
    note.save(function (err) {
        if (err) {
            res.send({status: 'Error', error: err});
        } else {
            console.log('Saved data ' + JSON.stringify(note));
            res.send({status: 'Success', id: note.id});
        }
    });
}

function editNote(req, res) {
    let id =  req.params.id;
    models.Note.findOne({_id: id}, function(err, note) {
        if (note == null) {
            res.send({status: 'Error', error: id + ' not found'});
            return;
        }
        note.value = req.body.note;
        note.date = Date.now();
        note.save(function (err) {
            if (err) {
                res.send({status: 'Error', error: err});
            } else {
                res.send({status: 'Success'});
            }
        });
        res.send({status: 'Success'});
    });
}

function deleteNote(req, res) {
    let id =  req.params.id;
    models.Note.findOne({_id: id}, function(err, note) {
        note.remove(function (err) {
            if (err) {
                res.send({status: 'Error', error: err});
            } else {
                res.send({status: 'Success'});
            }
        });
    });
}

module.exports = {
    getNotes: getNotes,
    getNoteById: getNoteById,
    createNote: createNote,
    editNote: editNote,
    deleteNote: deleteNote
};
