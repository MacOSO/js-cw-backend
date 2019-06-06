const Games = require('./model');
const ObjectId = require('mongoose').Types.ObjectId;

exports.getAllGames = () => Games.find({});

exports.searchGame = (q) => Games.find({ $or:[
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
    ]});

exports.getGameById = (_id) => Games.findById(_id);

exports.updateGame = (id, game) => Games.findOneAndUpdate(
    {_id: id},
    {$set:{
            name: game.name,
            price: game.price,
            description: game.description,
            thematics: game.thematics,
            genre: game.genre,
            online: game.online
    }},
    {new: true}
);

exports.insertGame = (game) => Games.create(
    {
        _id: new ObjectId,
        name: game.name,
        price: game.price,
        description: game.description,
        thematics: game.thematics,
        genre: game.genre,
        online: game.online
    });
