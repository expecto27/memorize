var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.functions.js');

var User = db.users;

// Получение всех пользователей
exports.findAll = (req, res) => {
    User.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.findById = (req, res) => {
    User.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.findByUsername = (req, res) => {
    User.findAll({
        where: {
            username: req.params.username
        }
    }).then(objects => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

// Удаление пользователя по id
exports.delete = (req, res) => {
    User.destroy({
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
    User.update({
            username: req.body.username,
            password: req.body.password
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

// Добавление пользователя
exports.create = (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};