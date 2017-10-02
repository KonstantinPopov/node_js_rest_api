const controller = require("../controllers/notes");

function handle(app) {

    app.get('/notes', (req, res) => {
        controller.getNotes(req, res);
    });

    app.get('/notes/:id', (req, res) => {
        controller.getNoteById(req, res);
    });

    app.post('/notes', (req, res) => {
        controller.createNote(req, res);
    });

    app.put('/notes/:id', (req, res) => {
        controller.editNote(req, res);
    });

    app.delete('/notes/:id', (req, res) => {
        controller.deleteNote(req, res);
    });
}

module.exports = {handle};
