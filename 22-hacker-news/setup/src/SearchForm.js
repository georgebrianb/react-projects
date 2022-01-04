import React, { useRef } from "react";
import { useGlobalContext } from "./context";

const SearchForm = () => {
  const { query, handleSearch } = useGlobalContext();
  const searchValue = useRef(null);
  React.useEffect(() => {
    searchValue.current.focus();
  }, []);
  return (
    <form className="search-form" onSubmit={(e) => e.preventDefault()}>
      <h2>Search hacker news</h2>
      <input
        type="text"
        id="name"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        ref={searchValue}
        className="form-input"
      />
    </form>
  );
};
export default SearchForm;
