var noteRoutes = require('./note_routes_var');

function route(app, db) {
    noteRoutes.handle(app, db);
}

module.exports = {
    route: route
};
