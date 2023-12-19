module.exports = (app) =>{
    const card = require('../controller/card');
    app.get('/api/cards', card.findAll);
    app.get('/api/card/:id', card.findById)

    app.post('/api/addCard/:idUser', card.create);
    app.post('/api/updateCard/:id', card.update);
    app.post('/api/deleteC/:id', card.delete);

    app.get('/api/myCards/:id', card.findbyDeck);
};