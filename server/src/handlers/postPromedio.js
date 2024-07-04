const controllPostPromedio= require("../controllers/controllPostPromedio");

const postPromedio = async(req, res)=>{
    try{
        const newProduct = await controllPostPromedio(req);
        res.status(201).json({message: newProduct});
    }catch (error) {
        res.status(400).json({error: error.message});
    };
};

module.exports = postPromedio;