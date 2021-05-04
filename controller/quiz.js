const Quiz = require('../models/quiz');
const objectId = require('mongodb').ObjectId;
const { validateRole } = require('../util/validateRole');

exports.createQuiz = (req, res) => {
    try {
        let userRole = validateRole(res.locals.payload.role);

        if (userRole === "quizmaster") {
            Quiz.create(req.body)
                .then((quiz) => {
                    res.status(201).json(quiz);
                })
                .catch((err) => {
                    console.log(err);
            });
        }
        else {
            res.status(401).send({
                message: "This path is forbidden"
            });
        }
    }
    catch (err) {
        console.log(err);
    }  
};

exports.getQuiz = (req, res) => {
    try {
        let id = req.query.id;
        let objId = new objectId(id);
        let userRole = validateRole(res.locals.payload.role);
        
        if (userRole === "student") {
            Quiz.aggregate([
                {$unset: ["questions.answers"]}
            ])
            .then((quiz) => {
                res.status(200).json(quiz);
            })
            .catch((err) => {
                res.status(404).send({
                    message: "Error finding quiz"
                });
                console.log(err);
            });
        }
        else {
            Quiz.findById(objId)
                .then((quiz) => {
                    res.status(200).json(quiz);
                })
                .catch((err) => {
                    res.status(404).send({
                        message: "quiz not found"
                    });
                    console.log(err);
            });
        }
    }
    catch (err) {
        console.log(err);
    }   
};

exports.getQuizzes = (_req,res) => {
    try {
        let quizzes = Quiz.find({}, "title").exec();
        
        quizzes.then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(404).send({
                message: "Cannot find quizzes"
            }); 
            console.log(err);   
        });
    }
    catch (err) {
        console.log(err);
    }  
};


exports.editQuiz = (req, res) => {
    try {
        let id = req.query.id;
        let userRole = validateRole(res.locals.payload.role);

        if (userRole === "teacher" || userRole === "quizmaster") {
            Quiz.updateOne({_id: id}, {$set: {title: req.body.title, questions: req.body.questions}})
                .then((updatedQuiz) => {
                    res.status(201).json(updatedQuiz);
                })
                .catch((err) => {
                    console.log(err);
            });
        }
        else {
            res.status(401).send({
                message: "This path is forbidden"
            });
        } 
    } 
    catch (err) {
        console.log(err);
    }
};

exports.deleteQuiz = (req, res) => {
    try {
        let id = req.query.id;
        let userRole = validateRole(res.locals.payload.role);

        if (userRole === "quizmaster") {
            Quiz.remove({_id: id})
                .then((result) => {
                    res.status(201).json(result);
                })
                .catch((err) => {

                })
        }
        else {
            res.status(401).send({
                message: "This path is forbidden"
            });
        }
    } 
    catch (err) {
        console.log(err);
    }
};
