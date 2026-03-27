import { describe, test, expect, vi } from "vitest";
import QuizContext from "../QuizContext";
import { questions, resultOptions } from "../quizData";
import QuestionState from "../QuestionState";

function createContext(onChange = vi.fn()) {
  return {
    context: new QuizContext(questions, resultOptions, onChange),
    onChange,
  };
}

describe("QuizContext", () => {
  // test 1 calculate results
  describe("calculateResult()", () => {
    test("returns correct MBTI type based on scores", () => {
      const { context } = createContext();
      context.userAnswers = { I: 3, E: 1, S: 4, N: 2, T: 5, F: 0, J: 3, P: 1 };
      expect(context.calculateResult()).toBe("ISTJ");
      expect(context.result).toBe("ISTJ");
    });

    test("returns first letter of pair on tie", () => {
      const { context } = createContext();
      context.userAnswers = { I: 2, E: 2, S: 2, N: 2, T: 2, F: 2, J: 2, P: 2 };
      expect(context.calculateResult()).toBe("ISTJ");
    });

    test("handles all-zero scores", () => {
      const { context } = createContext();
      context.userAnswers = {};
      expect(context.calculateResult()).toBe("ISTJ");
    });

    test("returns ENFP when E, N, F, P are higher", () => {
      const { context } = createContext();
      context.userAnswers = { I: 0, E: 5, S: 1, N: 4, T: 1, F: 3, J: 0, P: 2 };
      expect(context.calculateResult()).toBe("ENFP");
    });
  });

  // test 2 restart quiz
  describe("resetQuiz()", () => {
    test("resets currentQuestionIndex to 0", () => {
      const { context } = createContext();
      context.currentQuestionIndex = 5;
      context.resetQuiz();
      expect(context.currentQuestionIndex).toBe(0);
    });

    test("resets all userAnswers to 0", () => {
      const { context } = createContext();
      context.userAnswers = { I: 5, E: 3 };
      context.resetQuiz();
      expect(context.userAnswers).toEqual({
        I: 0,
        E: 0,
        N: 0,
        S: 0,
        T: 0,
        F: 0,
        J: 0,
        P: 0,
      });
    });

    test("clears result and sets screen to start", () => {
      const { context } = createContext();
      context.result = "INFP";
      context.screen = "result";
      context.resetQuiz();
      expect(context.result).toBe("");
      expect(context.screen).toBe("start");
    });
  });

  // test 3 get current questions
  describe("getCurrentQuestion()", () => {
    test("returns the first question initially", () => {
      const { context } = createContext();
      context.currentQuestionIndex = 0;
      const q = context.getCurrentQuestion();
      expect(q).toBe(questions[0]);
      expect(q.question).toBe("You are at a party...");
    });

    test("returns the correct question after advancing index", () => {
      const { context } = createContext();
      context.currentQuestionIndex = 2;
      expect(context.getCurrentQuestion()).toBe(questions[2]);
    });

    test("returns undefined for out-of-bounds index", () => {
      const { context } = createContext();
      context.currentQuestionIndex = 9999;
      expect(context.getCurrentQuestion()).toBeUndefined();
    });
  });

  // test 4 start quiz
  describe("startQuiz()", () => {
    test("transitions screen to quiz when in start state", () => {
      const onChange = vi.fn();
      const context = new QuizContext(questions, resultOptions, onChange);
      context.startQuiz();
      const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1][0];
      expect(lastCall.screen).toBe("quiz");
    });

    test("sets current state to QuestionState", () => {
      const { context } = createContext();
      context.startQuiz();
      expect(context.currentState).toBeInstanceOf(QuestionState);
    });
  });

  // test 5 select answer
  describe("selectAnswer()", () => {
    test("accumulates scores when answering a question", () => {
      const { context } = createContext();
      context.startQuiz();
      context.selectAnswer("I");
      expect(context.userAnswers["I"]).toBeGreaterThanOrEqual(1);
    });

    test("advances to next question after answering", () => {
      const { context } = createContext();
      context.startQuiz();
      const indexBefore = context.currentQuestionIndex;
      context.selectAnswer("I");
      expect(context.currentQuestionIndex).toBe(indexBefore + 1);
    });

    test("ignores invalid answer keys", () => {
      const { context } = createContext();
      context.startQuiz();
      const indexBefore = context.currentQuestionIndex;
      context.selectAnswer("INVALID_KEY");
      expect(context.currentQuestionIndex).toBe(indexBefore);
    });
  });

  // test 6 restart quiz
  describe("restartQuiz()", () => {
    test("resets state after completing some questions", () => {
      const { context } = createContext();
      context.startQuiz();
      context.selectAnswer("I");
      context.selectAnswer("S");
      context.restartQuiz();
      expect(context.currentQuestionIndex).toBe(0);
      expect(context.result).toBe("");
    });

    test("calls onChange callback on restart", () => {
      const onChange = vi.fn();
      const context = new QuizContext(questions, resultOptions, onChange);
      onChange.mockClear();
      context.restartQuiz();
      expect(onChange).toHaveBeenCalled();
    });
  });
});
