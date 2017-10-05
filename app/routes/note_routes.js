const controller = require("../controllers/notes");

function handle(app) {
    app.get('/notes', controller.getNotes);
    app.get('/notes/:id', controller.getNoteById);
    app.post('/notes', controller.createNote);
    app.put('/notes/:id', controller.editNote);
    app.delete('/notes/:id', controller.deleteNote);
}

module.exports = {handle};
