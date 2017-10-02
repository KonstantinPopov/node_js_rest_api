var noteRoutes = require('./note_routes');

function route(app, db) {
    noteRoutes.handle(app, db);
}

module.exports = {
    route: route
};