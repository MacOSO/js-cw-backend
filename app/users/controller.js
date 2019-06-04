const repository = require('./repository');
const gamesRepository = require('../games/repository');

const gameRef = async (data) => {
    let countLib = data.library.length;
    let newLibrary = [];
    while(countLib--) {
        newLibrary.push(await gamesRepository.getGameById(data.library[countLib]));
        delete data.library[countLib];
        data['library'][countLib] = newLibrary[countLib];
    }
    return data;
};

exports.refill = async (req, res) => {
    let userId = req.body.userId;
    let amount = req.body.amount;
    //console.log(userId);
    //console.log(amount);
    if (userId === undefined || amount === undefined) return res.status(400).send({message: "Amount or userId is empty"});
    let oldBalance = await repository.getBalanceByUserId(userId);
    //console.log(oldBalance);
    if (!oldBalance) return res.status(404).send({message: "User not found"});
    if (amount < 0) return res.send({message: "Wrong refill amount"});
    const data = await repository.debit(userId, oldBalance.balance + amount);
    //console.log(data);
    return res.send({data: data});
};

exports.getAllUsers = async (req, res) => {
    const data = await repository.getAllUsers();
    return res.send({data: data});
};

exports.getUserById = async (req, res) => {
    let id = req.params._id;
    let data = await repository.getUserById(id);
    data = await gameRef(data);
    return res.send({data: data});
};

exports.getLibraryByUserId = async (req, res) => {
    let id = req.params._id;
    let data = await repository.getLibraryByUserId(id);
    data = await gameRef(data);
    return res.send({data: data});
};

exports.authUser = async (req, res) => {
    let login = req.body.login;
    let password = req.body.password;
    //console.log(req.body.login); console.log(password);
    let data = await repository.authUser(login, password);
    // console.log(data);
    return res.send({data: data});
};

exports.createUser = async (req, res) => {
    const login = await repository.checkUserExists(req.body.login);
    //console.log("Результат по запросу логина " + req.body.login +"\n" + login);
    //console.log(login.length === 0 ? "Пользователя не существует" : "Пользователь существует");
    if(req.body.login !== undefined && req.body.password !== undefined && login.length === 0) {
        let user = {login: req.body.login, password: req.body.password};
        const data = await repository.createUser(user);
        return res.send({data: data});
    } else {
        return res.status(409).send({message: "Error", data: null});
    }
};
