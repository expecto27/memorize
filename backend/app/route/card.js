module.exports = (app) =>{
    const card = require('../controller/card');
    app.get('/api/cards', card.findAll);
};