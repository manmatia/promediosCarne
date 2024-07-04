const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Categoria", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "El campo nombre no puede estar vacío",
        },
      },
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        validate: {
          min: 0,
        },
      },
    kgMedia: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        validate: {
          min: 0,
        },
      },
  },
  {
    timestamps: true,
    paranoid: true,
  });
};
