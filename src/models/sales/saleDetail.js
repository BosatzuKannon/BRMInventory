'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('saleDetail', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.BIGINT,
      autoIncrement: true,
      autoIncrementIdentity: true
    },
    id_sale: {
      allowNull: false,
      type: DataTypes.BIGINT
    },
    id_product: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    created: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'saleDetail',
      classMethods: {}
  });  
  return User;
};