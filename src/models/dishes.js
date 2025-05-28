const { DataTypes, Model } = require("sequelize");
const db = require("../config/database");

class Dish extends Model {
  static id;
  static name;
  static description;
  static image;
  static price;
  static category;
  static aviable;
  static ingredients;
  static isActive;
}

Dish.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM(
        "entree",
        "main course",
        "dessert",
        "beverage",
        "snack"
      ),
      allowNull: false,
    },
    aviable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    ingredients: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    }
  },
  {
    sequelize: db,
    modelName: "Dish",
    tableName: "dishes",
    timestamps: true,
  }
);

Dish.associate = (models) => {
  Dish.hasMany(models.DishOrder, { foreignKey: "dishId" });
};

Dish.prototype.toJSON = function () {
  const { ...dish } = this.get();
  return dish;
};

module.exports = Dish;
