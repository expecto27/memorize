var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.functions.js');

var User =db.users;

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