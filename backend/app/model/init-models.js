var DataTypes = require("sequelize").DataTypes;
var _cards = require("./cards");
var _decks = require("./decks");
var _users = require("./users");

function initModels(sequelize) {
  var cards = _cards(sequelize, DataTypes);
  var decks = _decks(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  cards.belongsTo(decks, { as: "deck", foreignKey: "deck_id"});
  decks.hasMany(cards, { as: "cards", foreignKey: "deck_id"});
  decks.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(decks, { as: "decks", foreignKey: "user_id"});

  return {
    cards,
    decks,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
