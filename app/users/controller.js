const repository = require('./repository');

exports.getAllUsers = async (req, res) => {
    const data = await repository.getAllUsers();
    return res.send({data: data});
};

exports.getUserById = async (req, res) => {
    let id = req.params._id;
    const data = await repository.getUserById(id);
    return res.send({data: data});
};

exports.authUser = async (req, res) => {
    let login = req.body.login;
    let password = req.body.password;
    console.log(req.body.login); console.log(password);
    const data = await repository.authUser(login, password);
    console.log(data);
    return res.send({data: data});
};

exports.createUser = async (req, res) => {
    if(req.body.login !== undefined && req.body.password !== undefined) {
        let user = {login: req.body.login, password: req.body.password};
        const data = await repository.createUser(user);
        return res.send({data: data});
    }
    return res.send({message: "Error", data: null});
};
