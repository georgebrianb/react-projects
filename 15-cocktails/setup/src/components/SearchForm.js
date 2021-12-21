import React from "react";
import { useGlobalContext } from "../context";

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext();
  const searchValue = React.useRef(null);

  const searchCocktail = () => {
    setSearchTerm(searchValue.current.value);
  };

  React.useEffect(() => {
    searchValue.current.focus();
  }, []);

  return (
    <section className="section search">
      <form onSubmit={(e) => e.preventDefault()} className="search-form">
        <div className="form-control">
          <label htmlFor="name">search your favorite cocktail</label>
          <input
            type="text"
            id="name"
            ref={searchValue}
            onChange={searchCocktail}
          />
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
