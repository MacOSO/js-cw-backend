const Users = require('./model');
const ObjectId = require('mongoose').Types.ObjectId;

exports.getAllUsers = () => Users.find({});

exports.getUserById = (_id) => Users.findById(_id);

exports.createUser = (user) => Users.create(
    {
        _id: new ObjectId,
        login: user.login,
        password: user.password
    });


