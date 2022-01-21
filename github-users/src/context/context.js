import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";
const GithubContext = React.createContext();

// Once we create the context as above we have access to the Provider and the Consumer
// since the usecontext hook we mostly use the provider

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  const [requests, setRequests] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ show: false, msg: "" });

  const checkRateLimit = () => {
    setLoading(true);
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;
        setRequests(remaining);
        if (remaining === 0) {
          toggleError(
            true,
            "Rate limit has been reached, try again in one hour"
          );
        }
      })
      .catch((err) => console.log(err));
    setLoading(false);
  };

  function toggleError(show = false, msg = "") {
    setError({ show, msg });
  }

  const getUser = async (user) => {
    toggleError();
    // setLoading(true)
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    );
    if (response) {
      // more logic here
      setGithubUser(response.data);
    } else {
      toggleError(true, "The username you are looking for doesn't exist");
    }
  };

  useEffect(checkRateLimit, []);

  if (loading) {
    return;
  }

  return (
    <GithubContext.Provider
      value={{ githubUser, repos, followers, requests, error, getUser }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
