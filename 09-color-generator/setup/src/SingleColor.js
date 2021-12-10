import React, { useState, useEffect } from "react";
import rgbToHex from "./utils";

const SingleColor = ({ rgb, weight, index, hex }) => {
  const [alert, setAlert] = useState(false);
  const bcg = rgb.join(",");
  const hexValue = `#${hex}`;

  useEffect(() => {
    const timeId = setTimeout(() => {
      setAlert(false);
    }, 1500);

    return () => {
      clearTimeout(timeId);
    };
  }, [alert]);

  const handleCopy = () => {
    setAlert(true);
    navigator.clipboard.writeText(hexValue);
  };

  return (
    <article
      className={`color ${index > 10 && "color-light"} `}
      style={{ backgroundColor: `rgb(${bcg})` }}
      onClick={handleCopy}
    >
      <p className="percent-value">{weight}%</p>
      <p className="color-value">{hexValue}</p>
      {alert && <p className="alert">Copied to clipboard</p>}
    </article>
  );
};

export default SingleColor;
