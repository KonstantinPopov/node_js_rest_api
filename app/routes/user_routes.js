const controller = require("../controllers/user");

function handle(app) {
    app.get('/users', controller.getUsersController);
    app.get('/users/:id', controller.getUsersController);
    app.post('/users', controller.createUserController);
    app.get('/get-friends-for-user/:id', controller.getUserFriensController);
    app.post('/add-friends-for-user/:id', controller.addFriendsController);
}

module.exports = {handle};
