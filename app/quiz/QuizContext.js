import StartState from "./StartState";
import ResultState from "./ResultState";

class QuizContext {
  constructor(questions, resultOptions, onChange) {
    this.currentState = null;
    this.currentQuestionIndex = 0;
    this.questions = questions;
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
    this.resultOptions = resultOptions;
    this.result = null;
    this.screen = "start";
    this.onChange = onChange;

   const savedResult = this.getSavedResult();

    if (savedResult) {
      this.result = savedResult;
      this.currentState = new ResultState();
      this.currentState.enter(this);
    } else {
      this.setState(new StartState());
    }
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
    const type =
      ((this.userAnswers.I || 0) >= (this.userAnswers.E || 0) ? "I" : "E") +
      ((this.userAnswers.S || 0) >= (this.userAnswers.N || 0) ? "S" : "N") +
      ((this.userAnswers.T || 0) >= (this.userAnswers.F || 0) ? "T" : "F") +
      ((this.userAnswers.J || 0) >= (this.userAnswers.P || 0) ? "J" : "P");

    this.result = {
      type,
      ...this.resultOptions[type],
    };
    localStorage.setItem("quizResult", JSON.stringify(this.result));
  }

    getSavedResult() {
      try {
        const saved = localStorage.getItem("quizResult");
        if (!saved) return null;

        const parsed = JSON.parse(saved);

        if (!parsed?.type || !this.resultOptions[parsed.type]) {
          return null;
        }

        return {
          type: parsed.type,
          ...this.resultOptions[parsed.type],
        };
      } catch (error) {
        console.error("Failed to read saved quiz result:", error);
        return null;
      }
    }

    clearSavedResult() {
      localStorage.removeItem("quizResult");
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
        currentQuestionIndex: this.currentQuestionIndex,
        totalQuestions: this.questions.length,
        question: this.getCurrentQuestion(),
        currentQuestion: this.getCurrentQuestion(),
        userAnswers: this.userAnswers,
        result: this.result,
        resultData: this.result,
      });
    }
  }
}

export default QuizContext;
