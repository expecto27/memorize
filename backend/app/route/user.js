module.exports = (app) =>{
    const user = require('../controller/user');
    app.get('/api/users', user.findAll);
};