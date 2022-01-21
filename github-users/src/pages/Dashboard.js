import React from "react";
import { Info, Repos, User, Search, Navbar } from "../components";
import loadingImage from "../images/preloader.gif";
import { GithubContext } from "../context/context";
import { Hearts } from "react-loader-spinner";

const Dashboard = () => {
  const { loading } = React.useContext(GithubContext);

  if (loading) {
    return (
      <main>
        <Navbar />
        <div
          style={{
            alignSelf: "center",
            display: "flex",
            justifyContent: "center",
            height: "50px",
            marginTop: "0",
            marginBottom: "10px",
          }}
        >
          <Hearts />
        </div>
        <Search />
      </main>
    );
  }

  return (
    <main>
      <Navbar></Navbar>
      <Search />
      <Info />
      <User />
      <Repos />
    </main>
  );
};

export default Dashboard;
