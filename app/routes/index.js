
const userRoutes = require('./user_routes');

function route(app, db) {
    userRoutes.handle(app, db);
}

module.exports = {
    route: route
};
