const Games = require('./model');
const ObjectId = require('mongoose').Types.ObjectId;

exports.getAllGames = () => Games.find({});

exports.searchGame = (q) => Games.find({ $or:[
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
    ]});

exports.getGameById = (_id) => Games.findById(_id);

exports.insertGame = (game) => Games.create(
    {
        _id: new ObjectId,
        name: game.name,
        price: game.price,
        description: game.description,
        photo: game.photo,
        thematics: game.thematics,
        download_link: {
            linux: game.download_link.linux,
            macOS: game.download_link.macOS,
            windows: game.download_link.windows
        },
        genre: game.genre,
        os: game.os,
        online: game.online
    });
