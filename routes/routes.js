const { snippetsController } = require('../controllers/snippetsController');
const { usersController } = require('../controllers/userController');

const router = require('express').Router();

// Все вопросы
router.get('/snippets', snippetsController.getAllSnippets);
// добавить вопросы
router.post('/add_snippet', snippetsController.createSnippet);
// Обновление вопроса
router.patch('/snippet/patch/:id', snippetsController.updateQuestion);
// Удаление вопроса
router.delete('/snippet/delete/:id', snippetsController.deleteSnippet);
// // Удаление вопроса

// Auth
router.post('/registration', usersController.registration);
router.post('/login', usersController.login);
router.post('/logout', usersController.logout);
router.get('/activate/:link', usersController.activate); // endpoint for acc activation by link
router.get('/refresh', usersController.refresh); // it gets new access and refresh tokens
module.exports = router;
