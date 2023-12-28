import React, { useState, useEffect } from 'react';
import Questions from "./Questions";
import QuestionCheck from "./QuestionCheck";

const Quiz = () => {
  const prizeAmounts = ['$0', '$100', '$200', '$300', '$500', '$1,000', '$2,000', '$4,000', '$8,000', '$16,000', '$32,000', '$64,000', '$125,000', '$250,000', '$500,000', '$1 Million'];
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [passedQuestion, setPassedQuestion] = useState([1, 4, 5]);
  const [randomQuestion, setRandomQuestion] = useState(null);
  const [gameStart,setGameStart]=useState(false);

  const randomQuestionSelector = () => {
    const newArray = Questions.filter((question) => {
      return passedQuestion.indexOf(question.id) < 0;
    });
    if (newArray.length > 0) {
      const randomIndex = Math.floor(Math.random() * newArray.length);
      const selectedQuestion = newArray[randomIndex];

      setPassedQuestion([...passedQuestion, selectedQuestion.id]);
      setRandomQuestion(selectedQuestion);
      console.log(selectedQuestion.id);
    }
  };

  const handleAnswer = (isCorrect) => {
    // Update state based on the correctness of the answer
    if (isCorrect) {

      
      setCorrectAnswer(correctAnswer + 1);
      if(correctAnswer>=15){
        alert("You won the game")
        setCorrectAnswer(0); // Reset the correct answer count
      setPassedQuestion([]); // Start over with an empty passed question array
      setRandomQuestion(null); // Reset the current question
      

      setGameStart(false)
      
      const storedUserDetails = localStorage.getItem("userdetails");
      const userDetails = storedUserDetails ? JSON.parse(storedUserDetails) : {};

      if (userDetails.highestScore < correctAnswer) {
        userDetails.highestScore = correctAnswer;
        localStorage.setItem("userdetails", JSON.stringify(userDetails));
  } 
      return false;
      }
     
      randomQuestionSelector(); // Move to the next question
    } else {
      const storedUserDetails = localStorage.getItem("userdetails");
      const userDetails = storedUserDetails ? JSON.parse(storedUserDetails) : {};

      if (userDetails.highestScore < correctAnswer) {
        userDetails.highestScore = correctAnswer;
        localStorage.setItem("userdetails", JSON.stringify(userDetails));
      }



      setCorrectAnswer(0); // Reset the correct answer count
      setPassedQuestion([]); // Start over with an empty passed question array
      setRandomQuestion(null); // Reset the current question
      setGameStart(false)
    }
  };

  const handleGameStart=()=>{
    setGameStart(true)
    randomQuestionSelector();
  }

  

  return (
    <div className='quiz'>
      <div className='question'>
        {gameStart?<></>:<button onClick={handleGameStart}>Start</button>}
        {gameStart && (randomQuestion && <QuestionCheck id={randomQuestion.id} onAnswer={handleAnswer} text={randomQuestion.questionText} options={randomQuestion.options}/>)}
      </div>
      <div className='amount'>
        {prizeAmounts.map((amount, index) => (

          <div className={(correctAnswer==index)?'active':''}><p key={index} >{amount}</p></div>
          
        ))}
      </div>
    </div>
  );
}

export default Quiz;
