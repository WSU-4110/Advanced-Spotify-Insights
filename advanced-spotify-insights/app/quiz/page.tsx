"use client";

import { useEffect, useRef, useState } from "react";
import QuizContext from "./QuizContext";
import { questions, resultOptions } from "./quizData";

export default function QuizPage() {
  const [quizState, setQuizState] = useState<any>(null);
  const contextRef = useRef<any>(null);

  useEffect(() => {
    const context = new QuizContext(questions, resultOptions, (updatedState: any) => {
      setQuizState(updatedState);
    });

    contextRef.current = context;
    context.notify(); // initialize UI
  }, []);

  if (!quizState) {
    return <div>Loading quiz...</div>;
  }

  const { screen, question, result, resultData, currentQuestionIndex } = quizState;

  return (
    <div className="p-8">
      {screen === "start" && (
        <div>
          <h1 className="text-3xl font-bold mb-4">MBTI Quiz</h1>
          <p className="mb-4">Find your personality type.</p>
          <button
            onClick={() => contextRef.current.startQuiz()}
            className="px-4 py-2 bg-black text-white rounded"
          >
            Start Quiz
          </button>
        </div>
      )}

      {screen === "quiz" && question && (
        <div>
          <h1 className="text-2xl font-bold mb-4">
            Question {currentQuestionIndex + 1}
          </h1>
          <p className="mb-6">{question.question}</p>

          <div className="flex flex-col gap-4">
            {Object.entries(question.answers).map(([answerKey, answer]: any) => (
              <button
                key={answerKey}
                onClick={() => contextRef.current.selectAnswer(answerKey)}
                className="px-4 py-3 border rounded text-left"
              >
                {answer.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {screen === "result" && (
        <div>
          <h1 className="text-3xl font-bold mb-4">Your Result: {result}</h1>

          {resultData?.image && (
            <img
              src={resultData.image}
              alt={result}
              className="w-64 h-auto mb-4"
            />
          )}

          <button
            onClick={() => contextRef.current.restartQuiz()}
            className="px-4 py-2 bg-black text-white rounded"
          >
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
}