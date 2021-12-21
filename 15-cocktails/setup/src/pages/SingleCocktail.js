import React from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
import { useGlobalContext } from "../context";
const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const SingleCocktail = () => {
  const [loading, setLoading] = React.useState(false);
  const [cocktail, setCocktail] = React.useState(null);

  const { id } = useParams();

  React.useEffect(() => {
    setLoading(true);
    async function getCocktail(url) {
      try {
        const response = await fetch(`${url}${id}`);
        console.log(response);
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    getCocktail();
  }, [id]);

  return (
    <section className="section cocktail-section">
      <Link to="/" className="btn btn-primary">
        Back home
      </Link>
      <div className="drink">
        <img src="" alt="" />
      </div>
    </section>
  );
};

export default SingleCocktail;
