import React from "react";
import { useGlobalContext } from "./context";

const SearchForm = () => {
  const { setQuery, query, error } = useGlobalContext();
  const searchValue = React.useRef(null);

  const searchMovie = () => {
    setQuery(searchValue.current.value);
  };

  React.useEffect(() => {
    searchValue.current.focus();
  }, []);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="search-form">
      <h2>Search Movies</h2>

      <input
        type="text"
        id="name"
        value={query}
        ref={searchValue}
        onChange={searchMovie}
        className="form-input"
      />
      {error.show && <div className="error">{error.msg}</div>}
    </form>
  );
};

export default SearchForm;
