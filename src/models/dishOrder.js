const { DataTypes, Model } = require('sequelize');
const db = require('../config/database');

class DishOrder extends Model {
    static id;
    static dishId;
    static orderId;
}

DishOrder.init(
    {
        dishId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'dishes',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'orders',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        }
    },
    {
        sequelize: db,
        modelName: 'DishOrder',
        tableName: 'dish_orders',
        timestamps: true
    }
);

DishOrder.associate = (models) => {
    DishOrder.belongsTo(models.Dish, { foreignKey: 'dishId', as: 'dish' });
    DishOrder.belongsTo(models.Order, { foreignKey: 'orderId', as: 'order' });
}

DishOrder.prototype.toJSON = function () {
    const { ...dishOrder } = this.get();
    return dishOrder;
}

module.exports = DishOrder;