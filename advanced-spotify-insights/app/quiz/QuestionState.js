import QuizState from "./QuizState";

class QuestionState extends QuizState {
  enter(context) {
    context.screen = "quiz";
    context.notify();
  }

  startQuiz(context) {
    //quiz should be started
  }

  selectAnswer(context, answerKey) {
    const question = context.getCurrentQuestion();

    if (!question || !question.answers || !question.answers[answerKey]) {
      //invalid answer
      return;
    }

    const selectedAnswer = question.answers[answerKey];

    //add mbti scores

    if (selectedAnswer.scores) {
      for (const dimesnsion in selectedAnswer.scores) {
        context.userAnswers[dimension] = (context.userAnswers[dimension] || 0 ) + selectedAnswer.scores[dimension];
      }
    }

    if (context.currentQuestionIndex < context.questions.length - 1) {
      context.currentQuestionIndex++;
      context.notify();
    } else {
      context.culculateResult();
      context.setState(new ResultState());
    }
  }

  restartQuiz(context) {
    context.restartQuiz();
    context.notify();
  }
}

export default QuestionState;