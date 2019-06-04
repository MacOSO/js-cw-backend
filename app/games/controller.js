const repository = require('./repository');
const usersRepository = require('../users/repository');

function find(array, value) {

    for (var i = 0; i < array.length; i++) {
        if (array[i] === value) return true;
    }

    return false;
}

// TODO: поиск по играм по критериям: thematics, genres, online

exports.buyGame = async (req, res) => {
    const gameId = req.body.gameId;
    const userId = req.body.userId;
    // console.log(gameId);
    // console.log(userId);
    if (gameId === undefined || userId === undefined) {
        return res.status(400).send({message: "User or game Id is empty"});
    }
    const curLib = await usersRepository.getLibraryByUserId(userId);
    if (curLib === null) {
        return res.status(404).send({message: "User not found"});
    }
    if (find(curLib.library, gameId)) {
        return res.status(409).send({message: "The game was purchased earlier"});
    }
    const game = await repository.getGameById(gameId);
    if (game === null) {
        return res.status(404).send({message: "Game not found"});
    }
    const user = await usersRepository.getBalanceByUserId(userId);
    const newBalance = user.balance - game.price;
    if (newBalance < 0) {
        return res.status(402).send({message: "Not enough money"});
    }
    await usersRepository.debit(userId, newBalance);
    // console.log("old balance" + user.balance);
    // console.log("new balance" + newBalance);
    await usersRepository.addGameToLibrary(userId, gameId);
    const data = await usersRepository.getUserById(userId);
    // console.log(data);
    return res.send({message: "Game has been purchased", data: data})
};

exports.getAllGames = async (req, res) => {
    const data = await repository.getAllGames();
    return res.send({data: data});
};

exports.getGameById = async (req, res) => {
    let id = req.params._id;
    const data = await repository.getGameById(id);
    return res.send({data: data});
};

exports.uploadPicture = (req, res) => {
    console.log(req.files);
    if(!req.files)
    {
        return res.status(400).send({status: 400, message: 'No files were uploaded.'});
    }

    let sampleFile = req.files.sampleFile;
    let type = sampleFile.mimetype;

    if(type !== 'image/jpg') res.status(400).send({status: 400, message: 'You can upload only .jpg pictures.'});

    sampleFile.mv(__dirname + '/public/images/'+sampleFile.md5+'.jpg', function(err) {
        if (err)
            return res.status(500).send({status: 500, message: 'Error moving file to server.'});

        res.send('File uploaded!');
    });
};
