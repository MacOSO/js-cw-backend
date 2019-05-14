const repository = require('./repository');

exports.getAllGames = async (req, res) => {
    let limit = req.query.limit;
    let offset = req.query.offset;
    if(limit !== undefined && offset !== undefined){
        const data = await repository.getAllGames(Number(limit), Number(offset));
        return res.send({data: data});
    } else if(limit !== undefined) {
        // limit < 10 ? limit = 10: limit;
        const data = await repository.getAllGames(Number(limit), 0);
        return res.send({data: data});
    }
    const data = await repository.getAllGames(10, 0);
    return res.send({data: data});
};

exports.uploadPicture = (req, res) => {
    console.log(req.files);
    if(!req.files)
    {
        return res.status(400).send({status: 400, message: 'No files were uploaded.'});
    }

    let sampleFile = req.files.sampleFile;

    sampleFile.mv(__dirname + '/public/images/'+sampleFile.md5+'.jpg', function(err) {
        if (err)
            return res.status(500).send({status: 500, message: 'Error moving file to server.'});

        res.send('File uploaded!');
    });
};