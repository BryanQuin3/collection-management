const UserController = require('../controllers/user');

module.exports = (app) => {
    app.post('/user/register', UserController.createUser);
    app.post('/user/login', UserController.login);
    app.get('/user/cookie', UserController.cookie);
    app.get('/user/logout', UserController.logout);
    app.get('/user', UserController.getAllUsers);
    app.get('/user/check-auth', UserController.checkAuth);
}