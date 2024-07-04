const controllPostCategory= require("../controllers/controllPostCategory");

const postCategory = async(req, res)=>{
    try{
        const newProduct = await controllPostCategory(req);
        res.status(201).json({message: newProduct});
    }catch (error) {
        res.status(400).json({error: error.message});
    };
};

module.exports = postCategory;