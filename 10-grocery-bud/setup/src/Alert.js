import React, { useEffect } from "react";

const Alert = ({ msg, type, removeAlert, itemList }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 2000);
    return () => clearTimeout(timeout);
  }, [itemList]);

  return <p className={`alert alert-${[type]}`}>{msg}</p>;
};

export default Alert;
