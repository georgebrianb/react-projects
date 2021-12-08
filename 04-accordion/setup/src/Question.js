import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
const Question = ({ title, info }) => {
  const [showAll, setshowAll] = useState(false);
  return (
    <article className="question">
      <header>
        <h4>{title}</h4>
        <button className="btn" onClick={() => setshowAll(!showAll)}>
          {!showAll ? <AiOutlinePlus /> : <AiOutlineMinus />}
        </button>
      </header>
      {showAll && <p>{info}</p>}
    </article>
  );
};

export default Question;
