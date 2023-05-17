import { decode } from "html-entities";

export default function Answer(props) {
  // console.log(props);

  const styles = {
    backgroundColor:
      props.isChosen && props.displayResult === false
        ? "#D6DBF5"
        : props.displayResult && props.isCorrect
        ? "#94D7A2"
        : props.displayResult && props.isCorrect === false && props.isChosen
        ? "#F8BCBC"
        : "",
  };

  return (
    <span
      onClick={() => props.chooseAnsw(props.value, props.question)}
      style={styles}
      className={props.value ? "answer" : ""}
    >
      {decode(props.value)}
    </span>
  );
}
