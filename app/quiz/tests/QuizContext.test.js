// app/quiz/QuizContext.test.js
/* @vitest-environment jsdom */

import { describe, it, expect, vi, beforeEach } from "vitest";
import QuizContext from "../QuizContext";

const questions = [
  {
    question: "Q1",
    answers: {
      a: { text: "A", scores: { I: 1, S: 1 } },
      b: { text: "B", scores: { E: 1, N: 1 } },
    },
  },
  {
    question: "Q2",
    answers: {
      a: { text: "A", scores: { T: 1, J: 1 } },
      b: { text: "B", scores: { F: 1, P: 1 } },
    },
  },
];

const resultOptions = {
  ISTJ: { title: "ISTJ Result" },
};

beforeEach(() => {
  localStorage.clear();
  vi.clearAllMocks();
});

describe("QuizContext Methods", () => {
  it("goBack() moves to the previous question", () => {
    const quiz = new QuizContext(questions, resultOptions);
    
    quiz.startQuiz();
    quiz.selectAnswer("a");

    expect(quiz.currentQuestionIndex).toBe(1);

    quiz.goBack();

    expect(quiz.currentQuestionIndex).toBe(0);
  });

  it("goBack() does not go below question 0", () => {
    const quiz = new QuizContext(questions, resultOptions);

    quiz.currentQuestionIndex = 0;

    quiz.goBack();

    expect(quiz.currentQuestionIndex).toBe(0);
  });

  it("applyScores() adds answer scores to userAnswers", () => {
    const quiz = new QuizContext(questions, resultOptions);

    quiz.applyScores("a");

    expect(quiz.userAnswers.I).toBe(1);
    expect(quiz.userAnswers.S).toBe(1);
  });

  it("removeScores() subtracts answer scores from userAnswers", () => {
    const quiz = new QuizContext(questions, resultOptions);

    quiz.applyScores("a");

    expect(quiz.userAnswers.I).toBe(1);
    expect(quiz.userAnswers.S).toBe(1);

    quiz.removeScores("a");

    expect(quiz.userAnswers.I).toBe(0);
    expect(quiz.userAnswers.S).toBe(0);
  });

  it("getSavedResult() returns the result from localStorage", () => {
    const quiz = new QuizContext(questions, resultOptions);

    const savedResult = {
      type: "ISTJ",
      title: "ISTJ Result",
    };

    localStorage.setItem("quizResult", JSON.stringify(savedResult));

    expect(quiz.getSavedResult()).toEqual(savedResult);
  });

  it("clearSavedResult() removes the saved result from localStorage", () => {
    const quiz = new QuizContext(questions, resultOptions);

    localStorage.setItem("quizResult", JSON.stringify({ type: "ISTJ" }));

    quiz.clearSavedResult();

    expect(localStorage.getItem("quizResult")).toBeNull();
  });

  it("notify() calls onChange with quiz data", () => {
    const onChange = vi.fn();

    const quiz = new QuizContext(questions, resultOptions, onChange);

    onChange.mockClear();

    quiz.notify();

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        screen: quiz.screen,
        currentQuestionIndex: quiz.currentQuestionIndex,
        totalQuestions: questions.length,
        userAnswers: quiz.userAnswers,
        result: quiz.result,
      })
    );
  });
});