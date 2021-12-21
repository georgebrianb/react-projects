import React from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";

const SingleCocktail = () => {
  const [loading, setLoading] = React.useState(true);
  const [cocktail, setCocktail] = React.useState(null);

  const { id } = useParams();

  React.useEffect(() => {
    setLoading(true);
    async function getCocktail(url) {
      try {
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await response.json();
        console.log(data);
        if (data.drinks) {
          const {
            strDrink: name,
            strDrinkThumb: image,
            strAlcoholic: info,
            strCategory: category,
            strInstructions: instructions,
            strGlass: glass,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          } = data.drinks[0];
          const ingredients = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          ];
          console.log("INIASDASD", ingredients);
          const newCocktail = {
            name,
            image,
            glass,
            info,
            instructions,
            category,
            ingredients,
          };
          setCocktail(newCocktail);
        } else {
          setCocktail(null);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getCocktail();
  }, [id]);

  if (loading) {
    return <Loading />;
  }
  if (!cocktail) {
    return <h2 className="section-title"> no cocktail to display</h2>;
  }
  console.log(cocktail);
  const { name, info, glass, category, ingredients, image, instructions } =
    cocktail;
  console.log(instructions);
  console.log("Ingredients: ", instructions);

  return (
    <section className="section cocktail-section">
      <Link to="/" className="btn btn-primary">
        Back home
      </Link>
      <h2 className="section-title">{name}</h2>
      <div className="drink">
        <img src={image} alt={name} />
        <div className="drink-info">
          <p>
            <span className="drink-data">name : </span>
            {name}
          </p>
          <p>
            <span className="drink-data">category : </span>
            {category}
          </p>
          <p>
            <span className="drink-data">Info : </span>
            {info}
          </p>
          <p>
            <span className="drink-data">glass : </span>
            {glass}
          </p>
          <p>
            <span className="drink-data">Instructions : </span>
            {instructions}
          </p>
          <p>
            <span className="drink-data">Ingredients</span>
            {ingredients.join(" ")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SingleCocktail;
