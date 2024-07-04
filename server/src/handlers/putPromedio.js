const controllPutPromedio = require("../controllers/controllPutPromedio");

const putPromedio = async (req, res) => {
  const { id: categoriaId } = req.params;
  const updates = req.body; 

  try {
    const response = await controllPutPromedio(categoriaId, updates);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = putPromedio;
