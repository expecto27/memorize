module.exports = (app) =>{
    const deck = require('../controller/deck');
    app.get('/api/decks', deck.findAll);
};