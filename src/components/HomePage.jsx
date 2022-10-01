import React from "react";
import "./App.css";

const HomePage = ({ getQuiz }) => {
  return (
    <div className="HomePage">
      <h1>Quizzical</h1>
      <p>Quick test for the brain development</p>
      <button onClick={() => getQuiz(true)} className="btn">
        Start Quiz
      </button>
    </div>
  );
};

export default HomePage;
