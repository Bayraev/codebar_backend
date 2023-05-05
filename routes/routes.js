const { snippetsController } = require('../controllers/snippetsController');
const { usersController } = require('../controllers/userController');

const router = require('express').Router();
const { body } = require('express-validator');

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
router.post(
  '/registration',
  // checking look is it like email or have is it that lenght we need as well
  body('email').isEmail(),
  body('password').isLength({ min: 6, max: 24 }),
  usersController.registration,
);
router.post('/login', usersController.login);
router.post('/logout', usersController.logout);
router.get('/activate/:link', usersController.activate); // endpoint for acc activation by link
router.get('/refresh', usersController.refresh); // it gets new access and refresh tokens
module.exports = router;
