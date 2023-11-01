const { snippetsController } = require('../controllers/snippetsController');
const { usersController } = require('../controllers/userController');

const router = require('express').Router();
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');

// Все вопросы
router.get('/api/snippets', authMiddleware, snippetsController.getAllSnippets);
// Вопросы пользователя
router.get('/api/snippets/:id', authMiddleware, snippetsController.getSnippetsById);
// добавить вопросы
router.post('/api/new_snippet', authMiddleware, snippetsController.createSnippet);
// Обновление вопроса
router.patch('/api/snippet/patch/:id', authMiddleware, snippetsController.updateQuestion);
// Удаление вопроса
router.delete('/api/snippet/delete/:id', authMiddleware, snippetsController.deleteSnippet);
// // Удаление вопроса

// Auth
router.post(
  '/api/registration',
  // checking look is it like email or have is it that lenght we need as well
  body('email').isEmail(),
  body('password').isLength({ min: 6, max: 24 }),
  usersController.registration,
);
router.post('/api/login', usersController.login);
router.post('/api/logout', usersController.logout);
router.get('/api/activate/:link', usersController.activate); // endpoint for acc activation by link
router.get('/api/refresh', usersController.refresh); // it gets new access and refresh tokens
module.exports = router;
