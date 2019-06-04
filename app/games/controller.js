const repository = require('./repository');
const usersRepository = require('../users/repository');

// TODO: поиск по играм по критериям: thematics, genres, online

// TODO: покупка игры: game id req.params, user id req.body, проверить наличие в библиотеке
//  добавить в библиотеку к пользователю, списать со счёта

exports.buyGame = async (req, res, next) => {
    const gameId = req.params.id;
    const userId = req.body._id;
    if (gameId !== undefined || userId !== undefined) {
        res.send({message: "User or game Id is empty"});
        next();
    }
    const curLib = await usersRepository.getLibraryByUserId(userId);
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
