var express = require('express');
var router = express.Router();

var questionList = [
    {
        text: "This is a cool looking Space Needle.",
        answer: "seattle"
    },
    {
        text: "This may be the largest pyramid in the entire world.",
        answer: "giza"
    },
    {
        text: "From Red Square to St. Basil's.",
        answer: "moscow"
    },
    {
        text: "The angels sure are in this outfield. It's their stadium after all.",
        answer: "anaheim"
    },
    {
        text: "Big Ben, and lots of fish and chips.",
        answer: "london"
    },
    {
        text: "The city of lights looks super nice from Eifel's tower.",
        answer: "paris"
    },
    {
        text: "Four major religions claim this city for their own.",
        answer: "jerusalem"
    },
    {
        text: "Not Constantinople",
        answer: "istanbul"
    }
    
]
var commentList = [
    {
        text: "Come on... Literally hit the search location button..."
    },
    {
        text:" So close... Yet so far away..."
    },
    {
        text: "Detective. Really, is that the best you could do?"
    },
    {
        text: "Well, you can't expect me to make it easy on you."
    },

    {
        text: "You caught me! Just kidding, that's not true."
    },
    {
        text: "Well, well, well detective. I underestimated, wait, no, I underestimated the last detective. You're just average."
    },
    {
        text: "Zzz.... Zzz... Oh, sorry, I forgot you were chasing me."
    },
    {
        text: "Hey, maybe next time you'll bring me some lunch. I've been waiting for forever..."
    }
]

/* GET home page. */
router.get('/', function (req, res) {
    //res.render('index', { title: 'Express' });
    res.sendFile('index.html', { root: 'public' });
});


router.post('/carmen', function (req, res) {
    console.log("In carmen");
    var theQuestionNumber = req.body.questionNumber;

    var response = {
        message: "Well, seems you're not totally incompentent, come get me!" , 
        clue: questionList[theQuestionNumber]
    }
    console.log(req.body);
    console.log(response);
    res.send(response);
    
});

router.post('/guess', function (req, res) {
    console.log("in guess");
    
    
    console.log(req.body.guess);
    if (req.body.currentQuestion === -1) {
        console.log("In first question")
        var firstQuestion = {
            isCorrect: true,
            message: commentList[3],
            continue: true,
            nextQuestion: 0
        }
        
        res.send(firstQuestion);
    }
    else
    {
        console.log("Not in first question");
        var questionAnswer = questionList[req.body.currentQuestion];
        console.log("The answer to the question is " + questionList[req.body.currentQuestion].answer);
       

        var returnedAnswer = req.body.guess;
        console.log("The answer given is " + returnedAnswer);
        
        if (questionAnswer.answer === returnedAnswer.toLowerCase()) {
            if (req.body.numberCorrect > 4) {
                var finished = {
                    isCorrect: true,
                    message: "Congradulations! You caught Carmen Sandiego!",
                    continue: false,
                    nextQuestion: false
                }
                res.send(finished);
            }
            else {
                console.log("Incorrect Answer");
                var nextNumber = Math.floor(Math.random() * (8));
                var response = {
                    isCorrect: true,
                    message: "Well, seems you're not totally incompentent, come get me!",
                    continue: true,
                    nextQuestion: nextNumber
                }
                res.send(response);
            }
        }
        else {
            var nextMessage = Math.floor(Math.random() * (7 + 1));
            console.log(commentList[nextMessage]);
            var response = {
                isCorrect: false,
                message: commentList[nextMessage],
                continue: true,
                nextQuestion: false
            }
            res.send(response);
        }
    }

    
});


module.exports = router;