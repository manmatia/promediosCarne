const controllPutCategory = require("../controllers/controllPutCategory");

const putCategory = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const response = await controllPutCategory(id, updates);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = putCategory;

