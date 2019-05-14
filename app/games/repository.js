const Games = require('./model');
const ObjectId = require('mongoose').Types.ObjectId;

exports.getAllGames = (limit, offset) => Games.find({}).skip(offset).limit(limit);

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