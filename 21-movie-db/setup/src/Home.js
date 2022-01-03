import React from "react";
import Form from "./SearchForm";
import Movies from "./Movies";
import { useGlobalContext } from "./context";
const Home = () => {
  return (
    <main>
      <Form />
      <Movies />
    </main>
  );
};

export default Home;
