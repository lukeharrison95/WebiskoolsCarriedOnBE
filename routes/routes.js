const express = require('express');
const registerController = require('../controller/register');
const loginController = require('../controller/login');
const quizController = require('../controller/quiz');
const { getRole } = require('../middleware/getRole');

const router = express.Router();

router.post('/register', registerController.register);
router.post('/login', loginController.login);

router.post('/createQuiz', getRole, quizController.createQuiz);
router.get('/getQuiz', getRole, quizController.getQuiz);
router.get('/getQuizzes', quizController.getQuizzes);
router.patch('/editQuiz', getRole, quizController.editQuiz);
router.delete('/deleteQuiz', getRole, quizController.deleteQuiz);

module.exports = router;
