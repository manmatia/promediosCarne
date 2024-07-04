const controllGetCategory = require('../controllers/controllGetCategory');

const getCategory = async(req,res)=>{
    try {
        const Category = await controllGetCategory(req);
        res.status(200).json(Category);
    } catch (error) {
        res.status(400).json({error: error.message});
    };
};

module.exports = getCategory;