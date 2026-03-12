import QuizState from "./QuizState";

class ResultState extends QuizState {
  enter(context) {
    context.restartQuiz();

    context.screen = "result";

    context.notify();
  }

  startQuiz(context) {
    //quiz should be over
  }

  selectAnswer(context, answerKey) {
    //no answers to select
  }

  restartQuiz(context) {
    context.restartQuiz();
    context.notify();
  }
}

export default ResultState;