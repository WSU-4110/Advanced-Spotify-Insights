import QuizState from "./QuizState";
import StartState from "./StartState";

class ResultState extends QuizState {
  enter(context) {
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
    context.clearSavedResult();
    context.resetQuiz();
    context.setState(new StartState());
  }
}

export default ResultState;