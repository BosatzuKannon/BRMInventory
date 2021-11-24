'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.BIGINT,
      autoIncrement: true,
      autoIncrementIdentity: true
    },
    doc: {
      allowNull: false,
      type: DataTypes.STRING
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    role: {
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
      tableName: 'users',
      classMethods: {}
  });  
  return User;
};