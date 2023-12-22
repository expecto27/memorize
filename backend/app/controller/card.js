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

exports.findById = (req, res) => {
    Card.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.delete = (req, res) => {
    Card.destroy({
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
    Card.update({
            name: req.body.name,
            translate: req.body.translate,
            image: req.body.image,
            rate: req.body.rate
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
    Card.create({
        name: req.body.name,
        translate: req.body.translate,
        rate: 0,
        deck_id: req.body.deck_id
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

exports.findbyDeck = (req, res) =>{
    Card.findAll({
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