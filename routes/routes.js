// const { questionsController } = require('../controllers/questionControllers')

const router = require('express').Router();

// Все вопросы
router.get('/snipppets');
// добавить вопросы
router.post('/add_snippet');
// Обновление вопроса
router.patch('/snippet/patch/:id');
// Удаление вопроса
router.delete('/patch/delete/:id');
// // Удаление вопроса
// router.delete('/patch/delete/:id', questionsController.deleteQuestion);

module.exports = router;
