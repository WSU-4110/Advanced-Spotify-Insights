import { describe, it, expect, vi } from "vitest";
import QuizContext from "../QuizContext";

describe("QuizContext", () => {
  it("calculateResult returns correct MBTI type", () => {
    const context = new QuizContext([], {}, null);

    context.userAnswers = {
      I: 2, E: 1,
      S: 0, N: 3,
      T: 4, F: 2,
      J: 1, P: 0,
    };

    const result = context.calculateResult();

    expect(result.type).toBe("INTJ");
  });

  it("resetQuiz resets all values", () => {
    const context = new QuizContext([], {}, null);

    context.currentQuestionIndex = 5;
    context.result = "INTJ";
    context.userAnswers = { I: 10 };

    context.resetQuiz();

    expect(context.currentQuestionIndex).toBe(0);
    expect(context.result).toBe("");
    expect(context.screen).toBe("start");
  });

  it("getCurrentQuestion returns the correct question", () => {
    const questions = [
      { question: "Q1" },
      { question: "Q2" }
    ];

    const context = new QuizContext(questions, {}, null);
    context.currentQuestionIndex = 1;

    expect(context.getCurrentQuestion()).toEqual({ question: "Q2" });
  });

  it("startQuiz calls current state's startQuiz method", () => {
  const mockState = {
    startQuiz: vi.fn(),
    enter: vi.fn()
  };

  const context = new QuizContext([], {}, null);

  context.setState(mockState);
  context.startQuiz();

  expect(mockState.startQuiz).toHaveBeenCalledWith(context);
    });

    it("setState updates state and calls enter", () => {
  const mockState = {
    enter: vi.fn()
  };

  const onChange = vi.fn();
  const context = new QuizContext([], {}, onChange);

  context.setState(mockState);

  expect(context.currentState).toBe(mockState);
  expect(mockState.enter).toHaveBeenCalledWith(context);
});

});