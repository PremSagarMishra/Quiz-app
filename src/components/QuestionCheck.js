import React, { useState, useEffect } from 'react';
import Questions from './Questions'; // Import the Questions object

const QuestionCheck = ({ id, onAnswer ,text,options}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleOptionSelect = (selected) => {
    setSelectedOption(selected);

    // Retrieve the correct answer for the current question
    const correctAnswer = getCorrectAnswerForQuestion(id);

    
    // Check if the selected option is correct
    const correct = selected === correctAnswer;

    setIsCorrect(correct);

    // Pass the correctness to the parent component after a delay
    setTimeout(() => {
      onAnswer(correct);
    }, 1000); // Adjust the delay as needed
  };

  // Function to get the correct answer for the current question
  const getCorrectAnswerForQuestion = (questionId) => {
    const question = Questions.find((q) => q.id === questionId);
    return question ? question.correctAnswer : null;
  };

  

  // Reset state when a new question is received
  useEffect(() => {
    setSelectedOption(null);
    setIsCorrect(null);
  }, [id]);

  return (
    <div className='question-check'>
      {/* Display the question and options here */}
      
      <p>{text}</p>
      <div>
        <button
          type='button'
          className={selectedOption === options[0] ? 'selected' : ''}
          onClick={() => handleOptionSelect(options[0])}
        >
          {options[0]}
        </button>
        <button
          type='button'
          className={selectedOption === options[1] ? 'selected' : ''}
          onClick={() => handleOptionSelect(options[1])}
        >
          {options[1]}
        </button>
        <button
          type='button'
          className={selectedOption === options[2] ? 'selected' : ''}
          onClick={() => handleOptionSelect(options[2])}
        >
          {options[2]}
        </button>
        <button
          type='button'
          className={selectedOption === options[3] ? 'selected' : ''}
          onClick={() => handleOptionSelect(options[3])}
        >
          {options[3]}
        </button>
      </div>     {/* Display correctness message */}
      {isCorrect !== null && (
        <p style={{textAlign:"center"}}>{isCorrect ? 'Correct!' : 'You lost the game. Better Luck next time'}</p>
      )}
    </div>
  );
};

export default QuestionCheck;
