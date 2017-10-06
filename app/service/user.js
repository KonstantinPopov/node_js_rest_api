const userSchema = require("../models/user");

exports.getUserFreinds = function (user) {
    console.log(user);
    let foundsUser = [];
    if (user.friends.lenght !== 0) {
        foundsUser = user.friends.map(friend => findUsers(friend)); 
    }
    return Promise.all(foundsUser);
};

exports.findUsers = findUsers = function(id) {
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


exports.addFriends = function(req) {
    return Promise.resolve(req.body) 
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
};

exports.createNewUser = function(user) {
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
        if (user._id === friend._id) {
            reject('You try add yourself to friends');
            return;
        }
        if (user.friends.findIndex(element => element.toString() === friend.id) === -1) {
            user.friends.push(friend);
        } 
        if (friend.friends.findIndex(element => element.toString() === user.id) === -1) {
            friend.friends.push(user);
        } 

        user.save()
            .then(() => {
                return friend.save().then(() => {resolve()});
            })
            .catch((error) => {
                reject(new Error(error._message)); 
            });
    });
}


