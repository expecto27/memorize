var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.functions.js');

var Deck = db.decks;

exports.findAll = (req, res) => {
    Deck.findAll()
    .then(objects => {
        globalFunctions.sendResult(res, objects);
    })
    .catch(err => {
        globalFunctions.sendError(res, err);
    })
};
