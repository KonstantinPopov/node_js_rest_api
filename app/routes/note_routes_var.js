var models = require("../models");

function handle(app) {
///////////////////////////////////////////////////////////////////////////
    app.get('/notes', (req, res) => {
        models.Note.find({}, function(err, notes) {
            var noteMap = {};
            notes.forEach(function(note) {
                noteMap[note._id] = {note: note.value, date: note.date};
            });
            res.send(noteMap);
        });
    });

///////////////////////////////////////////////////////////////////////////
    app.get('/notes/:id', (req, res) => {
       let id = req.params.id;
        models.Note.findOne({_id: id}, function(err, note) {
            if (err) {
               res.send({status: 'Error', error: err.message});
            } else {
               res.send({note: note.value, date: note.date});
            }
        });
    });

///////////////////////////////////////////////////////////////////////////
    app.post('/notes', (req, res) => {
        if ((req.headers['content-type'] || 'application/json') !== 'application/json') {
            let contentType = req.headers['content-type'];
            console.log('Not valid content Type: ' + contentType);
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
    });

///////////////////////////////////////////////////////////////////////////
    app.put('/notes/:id', (req, res) => {
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

    });

///////////////////////////////////////////////////////////////////////////
    app.delete('/notes/:id', (req, res) => {
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
    });}

module.exports = {handle};
