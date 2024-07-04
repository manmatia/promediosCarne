const productById = require("../controllers/controllGetCategoryById");

const getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await productById(id);
    if (!response) {
      res.status(400).send("non-existent category");
    } else {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getCategoryById;
