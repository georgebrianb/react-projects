import axios from "axios";
import React, { useState, useContext, useEffect } from "react";

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

const url = "";

// setting up a temp url to test api fetch
const tempUrl =
  "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  // waiting will be set to true after the setup form is submited, so the modal can be shown
  const [waiting, setWaiting] = useState(true);
  // loading is used for rendering the spinner whenever we are fetching questions
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  // index of question that's being answered
  const [index, setIndex] = useState(0);
  // number of correct questions
  const [correct, setCorrect] = useState(0);
  // error object to be used throughout the project
  const [error, setError] = useState({ show: false, msg: "" });
  // self-explanatory, used so we know when the Modal (the trivia itself) is open
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchQuestions = async (url) => {
    // when we start fetching questions it means setup form has been submitted so we can set waiting to false
    // we set loading to true because we are fetching so it will show the spinner whilst that happens
    setLoading(true);
    setWaiting(false);

    const response = await axios(url).catch((err) => console.log(err));
    if (response) {
      // the array of questions is inside response.data.results
      const data = response.data.results;
      if (data.length > 0) {
        // if there are questions in the response, set the new questions array
        // set loading to false so we don't see the spinner
        // set waiting to false so we move on to the modal
        // set the error so it won't show (back to default)
        setQuestions(data);
        setLoading(false);
        setWaiting(false);
        setError({ show: false, msg: "" });
      }
    } else {
      // if there's no response / there's an error
      // set waiting to true so we are still at the setup form
      // set loading to false so there's no spinner
      // set error object
      setWaiting(true);
      setLoading(false);
      setError({ show: true, msg: "Could not retrieve questions" });
    }
  };

  useEffect(() => {
    fetchQuestions(tempUrl);
  }, []);

  return (
    //pass on the context vars to the children so it can be accessed anywhere using useGlobalContext() function
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        error,
        index,
        isModalOpen,
        correct,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
