import QuizState from "./QuizState";

class StartState extends QuizState {
  enter(context) {
    context.restartQuiz();

    context.screen = "start";

    context.notify();
  }

  startQuiz(context) {
    context.screen = "quiz";
    context.setState(new QuestionState());
  }

  selectAnswer(context, answerKey) {
    //no answers yet
  }

  restartQuiz(context) {
    context.resetQuiz();
    context.notify();
  }
}

export default StartState;