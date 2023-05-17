import { useState, useEffect } from "react";
import TriviaItems from "./TriviaItems";
import { nanoid } from "nanoid";
import shuffle from "./utilities";
import Intro from "./Intro";

function App() {
  const [trivia, setTrivia] = useState([]);
  const [score, setScore] = useState(0);
  const [displayResult, setDisplayResult] = useState(false);
  const [startQuiz, setStartQuiz] = useState(false);
  const [replay, setReplay] = useState(false);
  const [answerCount, setAnswerCount] = useState(0);

  console.log(trivia);

  useEffect(() => {
    playTrivia();
  }, []);

  function playTrivia() {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((Response) => Response.json())
      .then((data) => {
        let newData = data.results.map((item) => {
          return {
            id: nanoid(),
            question: item.question,
            answers: shuffle([
              {
                answer: item.correct_answer,
                isCorrect: true,
                isChosen: false,
              },
              {
                answer: item.incorrect_answers[0],
                isCorrect: false,
                isChosen: false,
              },
              {
                answer: item.incorrect_answers[1],
                isCorrect: false,
                isChosen: false,
              },
              {
                answer: item.incorrect_answers[2],
                isCorrect: false,
                isChosen: false,
              },
            ]),
          };
        });
        setTrivia(newData);
      });
  }

  function chooseAnsw(value, question) {
    let tempQuestionsGroup = trivia.map((triviaItems) => {
      if (triviaItems.question === question) {
        let tempChoicesGroup = triviaItems.answers.map((result) => {
          return result.answer === value
            ? { ...result, isChosen: true }
            : { ...result, isChosen: false };
        });
        return {
          ...triviaItems,
          answers: tempChoicesGroup,
        };
      } else {
        return triviaItems;
      }
    });
    setTrivia(tempQuestionsGroup);
  }

  function checkResult() {
    let tempScore = 0;
    let tempAnswerCount = 0;

    trivia.forEach((item) =>
      item.answers.forEach((answer) => {
        if (answer.isChosen && answer.isCorrect) {
          tempScore++;
          tempAnswerCount++;
        } else if (answer.isChosen) {
          tempAnswerCount++;
        }
      })
    );

    setAnswerCount(tempAnswerCount);
    setScore(tempScore);

    // if (answerCount === 5) {
    //   console.log(answerCount);
    //   setDisplayResult(true);
    //   setReplay(true);
    // }
  }

  useEffect(() => {
    // console.log("inside useEffect", answerCount);
    if (answerCount === 5) {
      // console.log("inside useEffect if", answerCount);
      setDisplayResult(true);
      setReplay(true);
    }
  }, [answerCount]);

  function handleStart() {
    setStartQuiz(true);
  }

  function replayGame() {
    setReplay(false);
    setDisplayResult(false);
    playTrivia();
    setAnswerCount(0);
  }

  const triviaItems = trivia.map((item) => (
    <TriviaItems
      key={item.id}
      question={item.question}
      answers={item.answers}
      chooseAnsw={chooseAnsw}
      displayResult={displayResult}
    />
  ));

  return (
    <div className="app">
      {!startQuiz ? (
        <Intro handleStart={handleStart} />
      ) : (
        <div className="trivia">
          <h1>trivia</h1>
          {triviaItems}
          {displayResult && <h4>You scored {score}/5 correct answers</h4>}
          {!replay ? (
            <button
              className="action-btn"
              onClick={checkResult}
              // disabled={answerCount !== 5}
            >
              Check Result
            </button>
          ) : (
            <button className="action-btn" onClick={replayGame}>
              Play again
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
