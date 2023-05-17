export default function Intro(props) {
  return (
    <div className="intro">
      <h1>Quizzical</h1>
      <h4>Some description if needed</h4>
      <button className="action-btn" onClick={props.handleStart}>
        Start quiz
      </button>
    </div>
  );
}
