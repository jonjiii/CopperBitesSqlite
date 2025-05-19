const { DataTypes, Model } = require('sequelize');
const db = require('../config/database');

class Order extends Model {
    static id;
    static quantity;
    static totalPrice;
    static status;
}

Order.init(
    {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        totalPrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
            defaultValue: 'pending',
            allowNull: false,
        },
    },
    {
        sequelize: db,
        modelName: 'Order',
        tableName: 'orders',
        timestamps: true,
    }
);

// Relationships
Order.User = Order.belongsTo(require('./users'), { foreignKey: 'userId' });
Order.Dish = Order.hasMany(require('./dishes'));

Order.prototype.toJSON = function () {
    const { ...order } = this.get();
    return order;
}

module.exports = Order;