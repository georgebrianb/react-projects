import React, { useState } from "react";
import data from "./data";
import SingleQuestion from "./Question";
function App() {
  const [questions, setQuestions] = useState(data);
  return (
    <main>
      <div className="container">
        <h3>Questions</h3>
        <section className="info">
          {questions.map(({ id, ...otherProps }) => {
            return <SingleQuestion key={id} {...otherProps} />;
          })}
        </section>
      </div>
    </main>
  );
}

export default App;
