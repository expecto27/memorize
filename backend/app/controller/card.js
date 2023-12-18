var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.functions.js');

var Card = db.cards;

exports.findAll = (req, res) => {
    Card.findAll()
    .then(objects => {
        globalFunctions.sendResult(res, objects);
    })
    .catch(err => {
        globalFunctions.sendError(res, err);
    })
};

exports.findAll = (req, res) =>{
    Card.byDeck({
        where:
        {
            deck_id: req.params.id
        }
    }
    ).then(objects => {
        globalFunctions.sendResult(res, objects);
    })
    .catch(err => {
        globalFunctions.sendError(res, err);
    })
}