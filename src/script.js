/* ================
// Scripts
// ============= */

var qq,
Quizquiz = {

  settings: {
    questions: {
      1: {
        question: "In the game, Shadow of the Colossus, what is the name of your horse?",
        answer: "b",
        choices: {
          a: "Otacon",
          b: "Agro",
          c: "Yaya",
          d: "Mister Horse"
        }
      },
      2: {
        question: "How many muses are in Nine Muses?",
        answer: "a",
        choices: {
          a: 6,
          b: 7,
          c: 8,
          d: 9
        }
      }
    },
    dom: {
      feedback: document.querySelectorAll('.qq-feedback'),
      questionsGroup: document.querySelector('.qq-questions'),
      results: document.querySelector('.qq-results')
    },
    vdom: {},
    currentQuestion: 0,
    results: {
      correct: 0,
      incorrect: 0
    }
  },

  init: function() {

    qq = this.settings;

    Quizquiz.constructQuestions(qq.questions);
    Quizquiz.navigateToQuestion(0);

  },

  constructQuestions: function(questions) {

    for (var key in questions) {
      var item = questions[key];

      if (questions.hasOwnProperty(key)) {
        var part = document.createElement('div');
        part.setAttribute('data-answer', item.answer);
        part.classList.add('qq-item');
        part.innerHTML = '<div class="qq-question">' + item.question + '</div>';

        var choices = document.createElement('div');
        choices.classList.add('qq-choices');
        part.appendChild(choices);

        for (var key in item.choices) {
          var choice = document.createElement('button');
          choice.classList.add('qq-choice');
          choice.setAttribute('data-choice', key);
          choice.innerHTML = item.choices[key];
          choice.addEventListener('click', function() {
            Quizquiz.determineTruth();
            Quizquiz.navigateToQuestion(1);
          });
          choices.appendChild(choice);
        }

        part.appendChild(choices);

        qq.dom.questionsGroup.appendChild(part);

        qq.vdom.questions = document.querySelectorAll('.qq-item');
      }

    }

  },

  determineTruth: function() {

    var userChoice = event.currentTarget.dataset.choice;
    var correctAnswer = qq.vdom.questions[qq.currentQuestion].dataset.answer;

    for (var i = 0; i < qq.dom.feedback.length; i++) {
      qq.dom.feedback[i].classList.remove('qq-feedback-active');
    }

    if (userChoice == correctAnswer) {
      qq.dom.feedback[0].classList.add('qq-feedback-active');
      Quizquiz.writeToResults(true);
    } else {
      qq.dom.feedback[1].classList.add('qq-feedback-active');
      Quizquiz.writeToResults(false);
    }

  },

  navigateToQuestion: function(modifier) {
    qq.currentQuestion += modifier;

    if (qq.currentQuestion >= qq.vdom.questions.length) {
      qq.dom.questionsGroup.classList.add('qq-questions-inactive');
      qq.dom.results.classList.add('qq-results-active');
      Quizquiz.outputResults();
    } else {
      for (var i = 0; i < qq.vdom.questions.length; i++) {
        qq.vdom.questions[i].classList.remove('qq-item-active');
      }

      qq.vdom.questions[modifier].classList.add('qq-item-active');
    }

  },

  writeToResults: function(result) {

    if(result) {
      qq.results.correct++;
    } else {
      qq.results.incorrect++;
    }

  },

  outputResults: function() {

    qq.dom.results.innerHTML =
      '<div class="qq-correct">Correct: ' + qq.results.correct + '</div>'
      + '<div class="qq-incorrect">Incorrect: ' + qq.results.incorrect + '</div>'
      + '<div class="qq-score">Score: ' + qq.results.correct / qq.vdom.questions.length * 100 + '%</div>';

  }

};

(function() {

  Quizquiz.init();

})();
