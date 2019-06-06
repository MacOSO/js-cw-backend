const repository = require('./repository');
const usersRepository = require('../users/repository');

const filter = (data, online, genres, thematics) => {
    online === 'true' ? online = true : online = false;
    if (typeof(thematics) === 'string') thematics = new Array(thematics);
    data = data.filter((game) =>{
        if (genres === undefined){
            if (!!game.online === online  && isHere(thematics, game.thematics)) return true
        } else if (genres.includes(game.genre) && !!game.online === online && isHere(thematics, game.thematics)){
            return true;
        }
        return false;
    });
    return data;
};

const isHere = (th1, th2) => {
    if (th1 === undefined) return true;
    let here = false;
    th1.forEach(item => {
        if (th2.indexOf(item) !== -1) here = true;
    });
    return here;
};

exports.search = async (req, res) => {
    const online = req.query.online;
    const genres = req.query.genres === undefined ? undefined : (req.query.genres).split(',');
    const thematics = req.query.thematics === undefined ? undefined : (req.query.thematics).split(',');
    let data = await repository.getAllGames();
    data = filter(data, online, genres, thematics);
    if (data.length > 0) {
        res.send({data: data});
    } else {
        res.status(404).send({message: "Games not found"});
    }
};

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
