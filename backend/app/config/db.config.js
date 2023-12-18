var dbProperties = {
    database: 'memo', 
    username: 'root', 
    password: '', 
    host: 'localhost', 
    dialect: 'mysql', 
    pool: { // параметры соединения
        max: 5, // максимальное количество одновременно открытых соединений
        min: 0, // минимальное количество соединений
        acquire: 30000, // максимальное время в миллисекундах, в течение которого пул (набор соединений к БД) будет пытаться установить соединение, прежде чем выдаст ошибку
        idle: 10000 // время в миллисекундах, в течение которого соединение может простаивать, прежде чем оно будет удалено
    }
};

var Sequelize = require('sequelize');
var sequelize = new Sequelize(
    dbProperties.database, dbProperties.username, dbProperties.password,
    {
        host: dbProperties.host,
        dialect: dbProperties.dialect,
        operatorsAliases: false,
        pool: {
            max: dbProperties.max,
            min: dbProperties.pool.min,
            acquire: dbProperties.pool.acquire,
            idle: dbProperties.pool.idle
        },
        define: {
            // имена таблиц не будут создаваться автоматически во множественном числе
            freezeTableName: true,

            // запрет на автоматическое создание полей createdAt и updatedAt (эти поля по умолчанию создаются ORM Sequalize во всех таблицах, при желании можете включить эту настройку)
            timestamps: false
        }
    }
);

// Подключение моделей
var init_models = require('../model/init-models');
var db = init_models.initModels(sequelize);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// фрагмент для проверки корректности работы таблиц (проверяем через report_type)
db.users.create({
    username: 'admin',
    password: 'APD'
})
.then(newReport => {
    console.log('Создана новая запись:', newReport);
})
.catch(error => {
    console.error('Ошибка при создании записи:', error);
});

module.exports = db;