import React, { useState } from "react";
import data from "./data";

function App() {
  const [paragraphs, setParagraphs] = useState([]);
  const [amount, setAmount] = useState(0);

  const handleChange = (e) => {
    const value = e.target.value;
    setAmount(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newParagraphs = data.filter(
      (paragraph, index) => index < parseInt(amount)
    );
    setParagraphs(newParagraphs);
  };

  return (
    <section className="section-center">
      <h3>Tired of boring lorem ipsum</h3>
      <form className="lorem-form">
        <label htmlFor="amount">Paragraphs:</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={amount}
          onChange={handleChange}
        ></input>
        <button type="submit" className="btn" onClick={handleSubmit}>
          Generate
        </button>
      </form>
      <article className="lorem-text">
        {paragraphs.map((paragraph, index) => {
          return <p key={index}>{paragraph}</p>;
        })}
      </article>
    </section>
  );
}

export default App;
