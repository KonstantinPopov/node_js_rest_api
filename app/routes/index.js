const noteRoutes = require('./note_routes');
const userRoutes = require('./user_routes');

function route(app, db) {
    noteRoutes.handle(app, db);
    userRoutes.handle(app, db);
}

module.exports = {
    route: route
};
