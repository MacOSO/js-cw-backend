const repository = require('./repository');

exports.getAllGames = async (req, res) => {
    const data = await repository.getAllGames();
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
