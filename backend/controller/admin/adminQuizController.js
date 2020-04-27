const Level = require('../../model/Level');
const User = require('../../model/User');
const Subject = require('../../model/Subject')
const Category = require('../../model/Catetory');
const Chapter = require('../../model/Chapter');
const Quiz = require('../../model/Quiz');
const chalk = require('chalk');


exports.getChapterbySelectedSubject = (req, res) => {
    let subjectID = req.params.id;
    console.log('requires subjectID', subjectID)
    Chapter.find({ subject: subjectID, status: 'activated' }).then((chapter) => {
        return res.status(200).json(chapter);
    })
    .catch(error => {
        return res.status(400).json(error);
    });
}

exports.addQuiz = (req, res) => {
    console.log(req.body.questions);
    let quiz = new Quiz();
    quiz.name = req.body.name;
    quiz.difficulty = req.body.difficulty;
    quiz.user = req.body.user;
    quiz.level = req.body.level;
    quiz.chapter = req.body.chapter;
    quiz.subject = req.body.subject;
    quiz.category = req.body.category;
    let tempQuiz = [];
    req.body.questions.map(function(question){
        let content = question.content;
        let answers = [];
        let tempAnswers = [];
        question.answers.map(function(item){
            tempAnswers.push({
                content: item.content,
                value: item.value
            })
        })
        answers = tempAnswers;
        tempQuiz.push({
            content: content,
            answers: answers
        })
    })
    quiz.questions = tempQuiz;
    quiz.save().then(
        quiz => {
            console.log('_____________quiz________________',quiz);
            return res.status(200).json({message: 'Quiz added successfully'});
        }
    ).catch(
        error => {
            return res.status(400).json({message: error});
        }
    );
}

exports.getQuiz = async (req, res) => {
    let id = req.params.id;
    let checkSuperAdmin = await User.findOne({_id: id});
    if(checkSuperAdmin.role == 'superadmin') {
        Quiz.find({ }).populate('level').populate('category').populate('subject').populate('chapter').populate('user').then((quiz) => {
            console.log(quiz)
            return res.status(200).json(quiz);
        })
        .catch(error => {
            return res.status(400).json(error);
        });
    } else if(checkSuperAdmin.role == 'admin') {
        Quiz.find({ user: id }).populate('level').populate('category').populate('subject').populate('chapter').populate('user').then((quiz) => {
            return res.status(200).json(quiz);
        })
        .catch(error => {
            return res.status(400).json(error);
        });
    }
}

exports.getQuizActivated = async (req, res) => {
    let id = req.params.id;
    let checkSuperAdmin = await User.findOne({_id: id});
    if(checkSuperAdmin.role == 'superadmin') {
        Quiz.find({ status: 'activated' }).populate('level').populate('category').populate('subject').populate('chapter').populate('user').then((quiz) => {
            console.log(quiz)
            return res.status(200).json(quiz);
        })
        .catch(error => {
            return res.status(400).json(error);
        });
    } else if(checkSuperAdmin.role == 'admin') {
        Quiz.find({ user: id, status: 'activated' }).populate('level').populate('category').populate('subject').populate('chapter').populate('user').then((quiz) => {
            return res.status(200).json(quiz);
        })
        .catch(error => {
            return res.status(400).json(error);
        });
    }
}

exports.getQuizDeactivated = async (req, res) => {
    let id = req.params.id;
    let checkSuperAdmin = await User.findOne({_id: id});
    if(checkSuperAdmin.role == 'superadmin') {
        Quiz.find({ status: 'deactivated' }).populate('level').populate('category').populate('subject').populate('chapter').populate('user').then((quiz) => {
            console.log(quiz)
            return res.status(200).json(quiz);
        })
        .catch(error => {
            return res.status(400).json(error);
        });
    } else if(checkSuperAdmin.role == 'admin') {
        Quiz.find({ user: id, status: 'deactivated' }).populate('level').populate('category').populate('subject').populate('chapter').populate('user').then((quiz) => {
            return res.status(200).json(quiz);
        })
        .catch(error => {
            return res.status(400).json(error);
        });
    }
}


exports.getQuizUnchecked = async (req, res) => {
    let id = req.params.id;
    let checkSuperAdmin = await User.findOne({_id: id});
    if(checkSuperAdmin.role == 'superadmin') {
        Quiz.find({ verification: 'unchecked' }).populate('level').populate('category').populate('subject').populate('chapter').populate('user').then((quiz) => {
            console.log(quiz)
            return res.status(200).json(quiz);
        })
        .catch(error => {
            return res.status(400).json(error);
        });
    } else if(checkSuperAdmin.role == 'admin') {
        Quiz.find({ user: id, verification: 'unchecked' }).populate('level').populate('category').populate('subject').populate('chapter').populate('user').then((quiz) => {
            return res.status(200).json(quiz);
        })
        .catch(error => {
            return res.status(400).json(error);
        });
    }
}
exports.updateStatusQuiz = (req, res) => {
    const id = req.body.id;
    const status = req.body.status;
    if (status == 'activated') {
        Quiz.findByIdAndUpdate(id, { status: 'deactivated'}).then(
            res => {
                return res.status(200).json({message: 'Status changed successfully'})
            },
            error => {
                return res.status(400).json({message: error})
            }
        ).catch(
            error => {
                return res.status(400).json({message: error})
            }
        )
    } else if(status == 'deactivated') {
        Quiz.findByIdAndUpdate(id, { status: 'activated'}).then(
            res => {
                return res.status(200).json({message: 'Status changed successfully'})
            },
            error => {
                return res.status(400).json({message: error})
            }
        ).catch(
            error => {
                return res.status(400).json({message: error})
            }
        )
    }
}

exports.removeQuiz = (req, res) => {
    const id = req.body.id;
    Quiz.deleteOne({ _id: id}).then(
        res => {
            return res.status(200).json({message: 'The Item successfully deleted'})
        },
        err => {
            return res.status(400).json({message: err})
        }
    ).catch(
        error => {
            return res.status(400).json({message: error})
        }
    )
}

exports.multipleQuizDelete = (req, res) => {
    let list = req.body.list;
    console.log(chalk.cyan(list))
    Quiz.deleteMany({_id: {$in: list }},
        function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        })
}

exports.getQuizById = (req, res) => {
    const id = req.params.id;
    Quiz.findOne({_id: id}).populate('user').populate('level').populate('category').populate('subject').populate('chapter').then(
        quiz => {
            if(quiz) {
                console.log(chalk.cyan(quiz))
                return res.status(200).json(quiz);
            } else {
                return res.status(200).json('');
            }
        },
        error => {
            return res.status(201).json({message: error})
        }
    ).catch(
        error => {
            return res.status(201).json({message: error})
        }
    )
}

exports.checkVerify = (req, res) => {
    const id = req.params.id;
    Quiz.findByIdAndUpdate(id, {verification: 'checked'}).then(
        quiz => {
            return res.status(200).json({message: 'Checked verification successfully'});
        }
    ).catch(
        error => {
            return res.status(400).json({message: error});
        }
    )
}