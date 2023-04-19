const { snippetsController } = require('../controllers/snippetsController');

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
// router.delete('/patch/delete/:id', questionsController.deleteQuestion);

module.exports = router;
