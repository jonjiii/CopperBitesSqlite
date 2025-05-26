const { DataTypes, Model } = require('sequelize');
const db = require('../config/database');

class User extends Model {
    static id;
    static name;
    static lastname;
    static email;
    static password;
    static token;
    static isActive;
}

User.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
    },
    {
        sequelize: db,
        modelName: 'User',
        tableName: 'users',
        timestamps: true
    }
);

User.associate = (models) => {
    User.hasMany(models.Order, { foreignKey: 'userId' });
}

User.prototype.toJSON = function () {
    const {password, ...user} = this.get();
    delete user.password;
    return user;
}

module.exports = User