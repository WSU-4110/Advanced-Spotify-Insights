import StartState from "./StartState";

class QuizContext {
  constructor(questions, resultOptions, onChange) {
    this.currentState = null;
    this.currentQuestionIndex = 0;
    this.questions = questions;
    this.userAnswers = {}; // score tracker, like a dictionary
    this.resultOptions = resultOptions;
    this.result = "";
    this.screen = "start";
    this.onChange = onChange;

    this.setState(new StartState());
  }

  setState(state) {
    this.currentState = state;
    this.currentState.enter(this);
    this.notify();
  }

  startQuiz() {
    this.currentState.startQuiz(this);
    this.notify();
  }

  selectAnswer(answerKey) {
    this.currentState.selectAnswer(this, answerKey);
    this.notify();
  }

  restartQuiz() {
    this.currentState.restartQuiz(this);
    this.notify();
  }

  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  calculateResult() {
    const pairs = [
      ["I", "E"],
      ["S", "N"],
      ["T", "F"],
      ["J", "P"],
    ];

    let result = "";

    for (const [first, second] of pairs) {
      const firstScore = this.userAnswers[first] || 0;
      const secondScore = this.userAnswers[second] || 0;

      if (firstScore >= secondScore) {
        result += first;
      } else {
        result += second;
      }
    }

    this.result = result;
    return result;
  }

  resetQuiz() {
    this.currentQuestionIndex = 0;
    this.userAnswers = {
      I: 0,
      E: 0,
      N: 0,
      S: 0,
      T: 0,
      F: 0,
      J: 0,
      P: 0,
    };
    this.result = "";
    this.screen = "start";
  }

  notify() {
    if (this.onChange) {
      this.onChange({
        screen: this.screen,
        question: this.getCurrentQuestion(),
        currentQuestion: this.getCurrentQuestion(),
        userAnswers: this.userAnswers,
        result: this.result,
        resultData: this.resultOptions[this.result] || null,
      });
    }
  }
}

export default QuizContext;