const Users = require('./model');
const ObjectId = require('mongoose').Types.ObjectId;

exports.getAllUsers = () => Users.find({});

exports.authUser = (login, password) => Users.findOne({login: { $search: login }, password: password});

exports.getUserById = (id) => Users.findById({_id: id});

exports.checkUserExists = (login) => Users.find({login: { $search: login }});

exports.getLibraryByUserId = (id) => Users.findById({_id: id}, {balance: 0, isAdmin: 0, _id: 0, login: 0, password: 0});

exports.getBalanceByUserId = (id) => Users.findById({_id: id}, {library: 0, isAdmin: 0, _id: 0, login: 0, password: 0});

exports.debit = (userId, balance) => Users.findOneAndUpdate({_id: userId}, {balance: balance}, {new: true});

exports.addGameToLibrary = (userId, gameId) => Users.findOneAndUpdate({_id: userId}, {$push: {library: gameId}});

exports.createUser = (user) => Users.create(
    {
        _id: new ObjectId,
        login: user.login,
        password: user.password
    });


