const Users = require('./model');
const ObjectId = require('mongoose').Types.ObjectId;

exports.getAllUsers = () => Users.find({});

exports.authUser = (login, password) => Users.findOne({login: login, password: password});

exports.getUserById = (_id) => Users.findById(_id);

exports.checkUserExists = (login) => Users.find({login: login});

exports.getLibraryByUserId = (_id) => Users.findById({_id: _id}, {balance: 0, isAdmin: 0, _id: 0, login: 0, password: 0});

exports.getBalanceByUserId = (_id) => Users.findById({_id: _id}, {library: 0, isAdmin: 0, _id: 0, login: 0, password: 0});

exports.createUser = (user) => Users.create(
    {
        _id: new ObjectId,
        login: user.login,
        password: user.password
    });


