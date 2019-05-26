const repository = require('./repository');

exports.getAllUsers = async (req, res) => {
    const data = await repository.getAllUsers();
    return res.send({data: data});
};

exports.getUserById = async (req, res) => {
    let id = req.params.id;
    const data = await repository.getUserById(id);
    return res.send({data: data});
};

exports.createUser = async (req, res) => {
    if(req.params.login !== undefined && req.params.password !== undefined) {
        let user = {login: req.params.login, password: req.params.password};
        const data = await repository.createUser(user);
        return res.send({data: data});
    }
    return res.send({message: "Error", data: null});
};
