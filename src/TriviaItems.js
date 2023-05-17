import { nanoid } from "nanoid";
import Answer from "./Answer";
import { decode } from "html-entities";

export default function TriviaItems(props) {
  const answerElements = props.answers.map((item) => {
    return (
      <Answer
        question={props.question}
        value={item.answer}
        key={nanoid()}
        isChosen={item.isChosen}
        isCorrect={item.isCorrect}
        chooseAnsw={props.chooseAnsw}
        displayResult={props.displayResult}
      />
    );
  });

  return (
    <div>
      <h2>{decode(props.question)}</h2>
      <div className="answers-wrapper">{answerElements}</div>
      <hr />
    </div>
  );
}
