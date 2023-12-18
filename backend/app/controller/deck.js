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

exports.findById = (req, res) => {
    Deck.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};


exports.delete = (req, res) => {
    Deck.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

exports.update = (req, res) => {
    Deck.update({
            name: req.body.name,
            image: req.body.image
        },
        {
            where: {
                id: req.params.id
            }
        }
    ).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

exports.create = (req, res) => {
    Deck.create({
        name: req.body.name,
        image: req.body.image,
        user_id: req.params.id
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

exports.findByUser = (req, res) =>{
    Deck.findAll({
        where:
        {
            user_id: req.params.id
        }
    }).then(objects => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};