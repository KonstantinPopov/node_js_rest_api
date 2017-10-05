const userSchema = require("../models").User;

function addFriendsController(req, res) {
    let proccessRequest = new Promise(results => {
        if ((req.headers['content-type'] || 'application/json') !== 'application/json') {
            let contentType = req.headers['content-type'];
            throw Error( 'Not valid content Type: ' + contentType);
        } else {
            results(req.body);
        }
    })
    .then(body => {
        let userId =  req.params.id;
        let friendsId = body.friends_id
        if (friendsId == undefined || ! friendsId instanceof Array) {
            throw Error('friends_id must be required, and containt array of user ids.');
        }
        let usersId = [userId].concat(friendsId);
        let foundsUser = usersId.map(findUsers);

        return Promise.all(foundsUser);
    })
    .then(users => {
        let user = users.shift();
        let friends = users;
        let userSavePromises = friends.map((friend) => addFriend(friend, user))

        return Promise.all(userSavePromises);
    })
    .then(() => {res.json({status:'Success'})})
    .catch(error => {res.json({status:'Error', error: error.message})});
};

function getUserFriensController(req, res) {
    findUsers(req.params.id)
        .then(
            user => {
                let friends = user.friends;
                var foundsUser = [];
                if (friends.lenght !== 0) {
                    foundsUser = friends.map(friend => findUsers(friend.user_id)); 
                }
            return Promise.all(foundsUser);
        })
        .then(friends => {
            friends = friends.map(friend => {return {id:friend._id, name:friend.fullName}});
            {res.json({status:'Success', data: friends})}
        })
        .catch(error => res.json({status:'Error', error: error.message}));
};

function getUsersController(req, res) {
    let id =  req.params.id;
    findUsers(id).then(users => {
        let userMap = {};
        users.forEach(function(user) {
            userMap[user._id] = {name: user.fullName, friends: user.friends};
        });

        return userMap;
    }).then(data => {
        res.json({status:'Success', data: data})
    }).catch(function(err){
        res.json({status:'Error', error: err.message})
    });
}

function createUsersController(req, res) {
    if ((req.headers['content-type'] || 'application/json') !== 'application/json') {
        let contentType = req.headers['content-type'];
        res.send({status: 'Error', error: 'Not valid content Type: ' + contentType})
        return;
    }
    let user = {firstName: req.body.firstName, lastName: req.body.lastName};

    createNewUser(user).then(userId => {
        res.json({status:'Success', data: {id: userId}})
    }).catch(function(err){
        res.json({status:'Error', error: err.message})
    });
}

function findUsers(id) {
    return new Promise(function(resolve, reject) {
        if (id) {
            var conditions = {_id: id};
        } else {
            var conditions = {};
        }
        userSchema.find(conditions, function(err, users) {
            if (err) {
                reject(err);
            } else {
                if (id) {
                    resolve(users.shift());
                } else {
                    resolve(users);
                }
            }
        });
    });
}

function createNewUser(user) {
    return new Promise(function(resolve, reject) {
        let {firstName, lastName} = user;
        if (firstName == undefined || lastName == undefined) {
            throw new Error('firstName and lastName must be required');
        }
        user = new userSchema(user);
        user.save(function (err) {
            if (err) {
                reject(err.message);
            } else {
                resolve(user.id);
            }
        });
    });
};

function addFriend(friend, user) {
    return new Promise(function(resolve, reject) {
        let friendsOfUser = user.friends;
        let friendsOfFriend = friend.friends;

        let friendId = friend.id;
        let userId = user.id;
        if (userId === friendId) {
            reject('You try add yourself to friends');
        }
        if (friendsOfUser.findIndex(element => element.user_id === friendId) === -1) {
            friendsOfUser.push({user_id: friendId, name: friend.fullName});
        }
        if (friendsOfFriend.findIndex(element => element.user_id === userId) === -1) {
            friendsOfFriend.push({user_id: userId, name: friend.fullName});
        }
        user.save(function (err) {
            if (err) {
                reject(err.message);
            }
        })
        friend.save(function (err) {
            if (err) {
                reject(err.message);
            }
        })
        resolve();
    });
}

module.exports = {
    getUsers:    getUsersController,
    createUsers: createUsersController,
    addFriends:  addFriendsController,
    getFriens:   getUserFriensController,
};
