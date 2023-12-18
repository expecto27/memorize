const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cards', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    translate: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    rate: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    deck_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'decks',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'cards',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "deck_id",
        using: "BTREE",
        fields: [
          { name: "deck_id" },
        ]
      },
    ]
  });
};
