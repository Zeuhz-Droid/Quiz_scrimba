import React, { useState } from "react";
import HomePage from "./HomePage";
import QuizPage from "./QuizPage";

const App = () => {
  const [quiz, setQuiz] = useState(false);

  const getQuiz = (value) => {
    setQuiz(value);
  };

  return (
    <div>
      <div className="blob blob-1"></div>
      {quiz ? <QuizPage /> : <HomePage getQuiz={getQuiz} />}
      <div className="blob blob-2"></div>
    </div>
  );
};

export default App;
