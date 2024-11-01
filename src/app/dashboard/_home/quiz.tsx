"use client";
import React, { useState } from "react";

interface QuizProps {
  title: string;
  questions: {
    question: string;
    options: { answer: string; isCorrect: boolean }[];
  }[];
}

const Quiz = () => {
  const quizData = {
    title: "JavaScript Basics Quiz",
    questions: [
      {
        question: "Which of these is a JavaScript framework?",
        options: [
          { answer: "React", isCorrect: true },
          { answer: "Laravel", isCorrect: false },
        ],
      },
      {
        question: "What is `let` used for in JavaScript?",
        options: [
          { answer: "Declaring variables", isCorrect: true },
          { answer: "Styling elements", isCorrect: false },
        ],
      },
    ],
  };

  const questions = quizData.questions;
  const title = quizData.title;

  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);

  const handleAnswerSelect = (questionIdx: number, optionIdx: number) => {
    setSelectedAnswers((prev) => {
      const updated = [...prev];
      updated[questionIdx] = optionIdx;
      return updated;
    });
  };

  const calculateScore = () => {
    const totalScore = questions.reduce((acc, question, idx) => {
      const selectedOption = selectedAnswers[idx];
      return question.options[selectedOption]?.isCorrect ? acc + 1 : acc;
    }, 0);
    setScore(totalScore);
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">{title}</h2>
      <div className="space-y-6">
        {questions.map((q, qIdx) => (
          <div key={qIdx} className="p-4 bg-gray-100 rounded-lg">
            <p className="font-medium">{q.question}</p>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {q.options.map((option, oIdx) => (
                <button
                  key={oIdx}
                  onClick={() => handleAnswerSelect(qIdx, oIdx)}
                  className={`p-2 rounded-lg border ${
                    selectedAnswers[qIdx] === oIdx
                      ? "bg-blue-500 text-white"
                      : "bg-white"
                  }`}
                >
                  {option.answer}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={calculateScore}
        className="w-full mt-6 bg-green-500 text-white py-2 rounded-lg font-semibold"
      >
        Submit Quiz
      </button>
      <p className="text-center mt-4 text-lg font-medium">
        Score: {score}/{questions.length}
      </p>
    </div>
  );
};

export default Quiz;
