module.exports = (app) =>{
    const deck = require('../controller/deck');
    app.get('/api/decks', deck.findAll);
    app.get('/api/deck/:id', deck.findById);
    app.post('/api/addDeck/', deck.create);
    app.post('/api/updateDeck/:id', deck.update);
    app.post('/api/deleteDeck/:id', deck.delete);

    app.get('/api/myDecks/:id', deck.findByUser);
};