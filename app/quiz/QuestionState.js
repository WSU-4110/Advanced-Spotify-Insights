import QuizState from "./QuizState";
import ResultState from "./ResultState";

class QuestionState extends QuizState {
  enter(context) {
    context.screen = "quiz";
    context.notify();
  }

  startQuiz(context) {
    //quiz should be started
  }

  selectAnswer(context, answerKey) {
    const currentIndex = context.currentQuestionIndex;

    const existingAnswerKey = context.selectedAnswers[currentIndex];
    if (existingAnswerKey) {
      context.removeScores(existingAnswerKey, currentIndex);
    }

    context.selectedAnswers[currentIndex] = answerKey;

    context.applyScores(answerKey);

    if (currentIndex < context.questions.length - 1) {
      context.currentQuestionIndex += 1;
      context.notify();
    } else {
      context.calculateResult();
      context.setState(new ResultState());
    }
  }

  goBack(context) {
    if (context.currentQuestionIndex <= 0) {
      return;
    }

    const previousIndex = context.currentQuestionIndex - 1;
    const previousAnswerKey = context.selectedAnswers[previousIndex];

    if (previousAnswerKey) {
      context.removeScores(previousAnswerKey, previousIndex);
      context.selectedAnswers[previousIndex] = null;
    }

    context.currentQuestionIndex = previousIndex;
    context.notify();
  }

  restartQuiz(context) {
    context.resetQuiz();
    context.notify();
  }
}

export default QuestionState;