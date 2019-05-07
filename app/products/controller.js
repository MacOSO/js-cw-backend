const repository = require('./repository');

exports.getAllProducts = async (req, res) => {
    let limit = req.query.limit;
    let offset = req.query.offset;
    if(limit !== undefined && offset !== undefined){
        const data = await repository.getAllProducts(Number(limit), Number(offset));
        return res.send({data: data});
    } else if(limit !== undefined) {
        // limit < 10 ? limit = 10: limit;
        const data = await repository.getAllProducts(Number(limit), 0);
        return res.send({data: data});
    }
    const data = await repository.getAllProducts(10, 0);
    return res.send({data: data});
};