const controller = require("../controllers/user");

function handle(app) {
    app.get('/users', controller.getUsers);
    app.get('/users/:id', controller.getUsers);
    app.post('/users', controller.createUsers);
    app.get('/get-friends-for-user/:id', controller.getFriens);
    app.post('/add-friends-for-user/:id', controller.addFriends);
}

module.exports = {handle};
