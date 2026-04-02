"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "../components/navbar";
import QuizContext from "./QuizContext";
import { questions, resultOptions } from "./quizData";

export default function QuizPage() {
  const [quizState, setQuizState] = useState<any>(null);
  const contextRef = useRef<any>(null);

  useEffect(() => {
    const context = new QuizContext(
      questions,
      resultOptions,
      (updatedState: any) => {
        setQuizState(updatedState);
      },
    );

    contextRef.current = context;
    context.notify(); // initialize UI
  }, []);

  if (!quizState) {
    return (
      <div className="min-h-screen bg-custom font-sans selection:bg-cyan-300">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <p className="text-cyan-950 font-semibold">Loading quiz...</p>
        </div>
      </div>
    );
  }

  const { screen, question, result, resultData, currentQuestionIndex } =
    quizState;

  return (
    <div className="min-h-screen bg-custom font-sans selection:bg-cyan-300">
      <Navbar />

      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <main className="flex flex-col items-center gap-10 max-w-2xl px-6 py-12 w-full">
          {screen === "start" && (
            <div className="bg-white/90 backdrop-blur-md p-8 rounded-[40px] border-4 border-white shadow-2xl w-full sm:w-[420px] flex flex-col justify-center relative overflow-hidden">
              <div className="w-full flex flex-col items-center gap-6 text-center z-10">
                <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-cyan-950 drop-shadow-sm">
                  Sea Spot Quiz
                </h1>
                <p className="text-lg leading-relaxed text-cyan-800 font-medium px-2">
                  Discover your personality type through your music taste.
                </p>
              </div>

              <div className="flex flex-col gap-4 items-center justify-center font-bold w-full mt-10 z-10">
                <button
                  onClick={() => contextRef.current.startQuiz()}
                  className="flex h-14 w-full sm:w-40 items-center justify-center rounded-full bg-cyan-500 px-6 text-white text-lg transition-all hover:bg-cyan-400 shadow-[0_6px_0_rgb(8,145,178)] hover:shadow-[0_2px_0_rgb(8,145,178)] hover:translate-y-[4px] active:shadow-none active:translate-y-[6px]"
                >
                  Start Quiz
                </button>
              </div>
            </div>
          )}

          {screen === "quiz" && question && (
            <div className="bg-white/90 backdrop-blur-md p-8 rounded-[40px] border-4 border-white shadow-2xl w-full sm:w-[500px] flex flex-col relative overflow-hidden">
              <div className="relative z-10">
                <div className="mb-6 text-center">
                  <h2 className="text-sm font-semibold text-cyan-600 mb-2">
                    Question {(quizState.currentQuestionIndex ?? 0) + 1} of {quizState.totalQuestions ?? 0}
                  </h2>
                  <h1 className="text-3xl font-extrabold text-cyan-950 drop-shadow-sm leading-tight">
                    {question.question}
                  </h1>
                </div>

                <div className="flex flex-col gap-3">
                  {Object.entries(question.answers).map(
                    ([answerKey, answer]: any) => (
                      <button
                        key={answerKey}
                        onClick={() =>
                          contextRef.current.selectAnswer(answerKey)
                        }
                        className="px-6 py-4 bg-cyan-100/70 border-2 border-cyan-300 rounded-2xl text-left font-semibold text-cyan-900 transition-all hover:bg-cyan-200 hover:border-cyan-400 hover:shadow-md active:scale-95"
                      >
                        {answer.text}
                      </button>
                    ),
                  )}
                </div>
              </div>
            </div>
          )}

          {screen === "result" && (
            <div className="bg-white/90 backdrop-blur-md p-8 rounded-[40px] border-4 border-white shadow-2xl w-full sm:w-[500px] flex flex-col items-center relative overflow-hidden">
              <div className="relative z-10 w-full flex flex-col items-center">
                <h1 className="text-4xl font-extrabold text-cyan-950 drop-shadow-sm mb-6 text-center">
                  Your Result: {quizState.result.type}
                </h1>

                {resultData?.image && (
                  <img
                    src={quizState.result.image}
                    alt={quizState.result.type}
                    width={500}
                    height={500}
                  />
                )}

                <button
                  onClick={() => contextRef.current.restartQuiz()}
                  className="flex h-14 w-full sm:w-48 items-center justify-center rounded-full bg-cyan-500 px-6 text-white text-lg transition-all hover:bg-cyan-400 shadow-[0_6px_0_rgb(8,145,178)] hover:shadow-[0_2px_0_rgb(8,145,178)] hover:translate-y-[4px] active:shadow-none active:translate-y-[6px] font-bold"
                >
                  Restart Quiz
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
