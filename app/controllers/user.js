const responsHelper = require('../service/responseHelper');
const userService = require('../service/user');

function addFriendsController(req, res) {

    if (! responsHelper.isValidRequestContentType(req, 'application/json')) {
        return responsHelper.error(res, new Error('Not valid content Type: ' + req.headers['content-type']));
    } 
    userService.addFriends(req)
        .then(() => responsHelper.success(res))
        .catch(error => responsHelper.error(res, error)); 
};

function getUserFriensController(req, res) {
    userService.findUsers(req.params.id)
        .then(user => userService.getUserFreinds(user))
        .then(friends => responsHelper.success(res, friends))
        .catch(error => responsHelper.error(res, error));
};

function getUsersController(req, res) {
    let id =  req.params.id;
    userService.findUsers(req.params.id)
    .then(data => responsHelper.success(res, data))
    .catch(error => responsHelper.error(res, error));
};

function createUserController(req, res) {
    if (! responsHelper.isValidRequestContentType(req, 'application/json')) {
        return responsHelper.error(res, new Error('Not valid content Type: ' + req.headers['content-type']));
    } 
    userService.createNewUser({firstName: req.body.firstName, lastName: req.body.lastName})
        .then(userId => responsHelper.success(res, {id: userId}, 201))
        .catch(error => responsHelper.error(res, error));
}

module.exports = {
    getUsersController:      getUsersController,
    createUserController:    createUserController,
    addFriendsController:    addFriendsController,
    getUserFriensController: getUserFriensController,
};
