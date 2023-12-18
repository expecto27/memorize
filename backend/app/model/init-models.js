var DataTypes = require("sequelize").DataTypes;
var _cards = require("./cards");
var _decks = require("./decks");
var _users = require("./users");

function initModels(sequelize) {
  var cards = _cards(sequelize, DataTypes);
  var decks = _decks(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  users.hasMany(decks, {foreignKey: "user_id", onDelete:"CASCADE"});
  decks.hasMany(cards, {foreignKey: "deck_id", onDelete:"CASCADE"});
  
  decks.belongsTo(users, {foreignKey: "user_id"});
  cards.belongsTo(decks, {foreignKey: "deck_id"});

  return {
    cards,
    decks,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
