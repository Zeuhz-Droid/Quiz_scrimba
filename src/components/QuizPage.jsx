import React, { useEffect, useState } from "react";
import Questions from "./Questions";
import "./App.css";
import openTrivia from "../apis/openTrivia";
import { nanoid } from "nanoid";

const QuizPage = () => {
  const [score, setScore] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState({});
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAnswer = (questID, answer) => {
    setAnswers((answers) => {
      return { ...answers, [questID]: answer };
    });
  };

  const getQuestions = async () => {
    const { data } = await openTrivia.get("", {
      params: {
        amount: 5,
        difficulty: "easy",
        type: "multiple",
      },
    });

    const quest = data.results.map((question) => {
      const random = Math.floor(Math.random() * 4) + 1;
      const arr = [...question.incorrect_answers];
      arr.splice(random, "", question.correct_answer);
      return {
        ...question,
        id: nanoid(),
        options: arr,
      };
    });
    setQuestions(quest);
  };

  useEffect(() => {
    getQuestions();
  }, []);

  useEffect(() => {
    const getCorrectAnswers = (questions) => {
      let correctAnswers = {};
      for (const quest of questions)
        correctAnswers[quest.id] = quest.correct_answer;
      setCorrectAnswers(correctAnswers);
    };
    getCorrectAnswers(questions);
  }, [questions]);

  const checkAnswers = (answers, correctAnswers) => {
    let total = 0;
    for (let [id, answer] of Object.entries(correctAnswers)) {
      for (let [answerId, option] of Object.entries(answers)) {
        if (answerId == id && option == answer) {
          total++;
          setScore(total);
        }
      }
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(!isSubmitted);
    checkAnswers(answers, correctAnswers);
    setIsCompleted(true);
  };

  const init = () => {
    setScore(null);
    setIsSubmitted(false);
    setIsCompleted(false);
    getQuestions();
  };

  return (
    <div className="Quiz">
      <Questions
        questions={questions}
        handleAnswer={handleAnswer}
        isSubmitted={isSubmitted}
      />
      <div className="score">
        <p className="score-msg">
          {isSubmitted ? `You scored ${score ? score : 0}/5 answers` : ""}
        </p>
        <button
          className="btn btn-submit"
          onClick={!isCompleted ? handleSubmit : init}
        >
          {`${isSubmitted ? "Play Again" : "Check Answers"}`}
        </button>
      </div>
    </div>
  );
};

export default QuizPage;
