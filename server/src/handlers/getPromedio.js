const controllGetPromedio = require('../controllers/controllGetPromedio');

const getPromedio = async(req,res)=>{
    try {
        const products = await controllGetPromedio(req);
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({error: error.message});
    };
};

module.exports = getPromedio;