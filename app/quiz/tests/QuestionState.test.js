import { describe, it, expect, vi } from "vitest";
import QuestionState from "../QuestionState";

describe("QuestionState", () => {
  it("enter sets screen to quiz and calls notify", () => {
    const context = {
      screen: "",
      notify: vi.fn(),
    };

    const state = new QuestionState();
    state.enter(context);

    expect(context.screen).toBe("quiz");
    expect(context.notify).toHaveBeenCalled();
  });

  it("selectAnswer updates score and moves to next question", () => {
    const context = {
      currentQuestionIndex: 0,
      questions: [
        {
          answers: {
            A: { scores: { I: 1 } },
          },
        },
        { answers: {} },
      ],
      userAnswers: {},
      notify: vi.fn(),
      getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
      },
    };

    const state = new QuestionState();
    state.selectAnswer(context, "A");

    expect(context.userAnswers.I).toBe(1);
    expect(context.currentQuestionIndex).toBe(1);
    expect(context.notify).toHaveBeenCalled();
  });

    it("selectAnswer accumulates scores across multiple answers", () => {
    const context = {
        currentQuestionIndex: 0,
        questions: [
        {
            answers: {
            A: { scores: { I: 1 } },
            },
        },
        {
            answers: {
            A: { scores: { I: 2 } },
            },
        },
        ],
        userAnswers: {},
        notify: vi.fn(),
        calculateResult: vi.fn(),
        setState: vi.fn(),
        getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
        },
    };

    const state = new QuestionState();

    state.selectAnswer(context, "A");
    state.selectAnswer(context, "A");

    expect(context.userAnswers.I).toBe(3);
    expect(context.calculateResult).toHaveBeenCalled();
    expect(context.setState).toHaveBeenCalled();
    });

  it("selectAnswer does nothing if there are no questions", () => {
    const context = {
      currentQuestionIndex: 0,
      questions: [],
      userAnswers: {},
      notify: vi.fn(),
      getCurrentQuestion() {
        return undefined;
      },
    };

    const state = new QuestionState();
    state.selectAnswer(context, "A");

    expect(context.userAnswers).toEqual({});
  });
});