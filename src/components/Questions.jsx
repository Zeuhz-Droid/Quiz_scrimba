import React from "react";
import "./App.css";

import Options from "./Options";

const Questions = ({ questions, handleAnswer, isSubmitted }) => {
  const renderedQuestions = questions.map((question) => {
    return (
      <div className="Question" key={question.id}>
        <h3
          className="title"
          dangerouslySetInnerHTML={{ __html: question.question }}
        ></h3>
        <div className="options">
          <Options
            question={question}
            handleAnswer={handleAnswer}
            isSubmitted={isSubmitted}
          />
        </div>
      </div>
    );
  });

  return <React.Fragment>{renderedQuestions}</React.Fragment>;
};

export default Questions;
