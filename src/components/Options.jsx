import { nanoid } from "nanoid";
import React, { useState } from "react";

export default ({ question, handleAnswer, isSubmitted }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleClick = (option) => {
    handleAnswer(question.id, option);
    setIsSelected(true);
    setSelectedOption(option);
  };

  const renderedOptions = question.options.map((option) => {
    return (
      <div
        key={nanoid()}
        id={nanoid()}
        className={`option ${
          !isSubmitted
            ? isSelected && option == selectedOption
              ? "active"
              : ""
            : option == question.correct_answer
            ? "correct"
            : option == selectedOption && option != question.correct_answer
            ? "wrong"
            : option != selectedOption && option != question.correct_answer
            ? "disabled"
            : ""
        }`}
        dangerouslySetInnerHTML={{ __html: option }}
        onClick={() => handleClick(option, option)}
      ></div>
    );
  });

  return <React.Fragment>{renderedOptions}</React.Fragment>;
};
