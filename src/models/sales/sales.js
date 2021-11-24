'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('sales', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.BIGINT,
      autoIncrement: true,
      autoIncrementIdentity: true
    },
    idUser: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    observation: {
      type: DataTypes.STRING,
      allowNull: true
    },
    created: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'sales',
      classMethods: {}
  });  
  return User;
};