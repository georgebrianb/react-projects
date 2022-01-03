import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { API_ENDPOINT, useGlobalContext } from "./context";

const SingleMovie = () => {
  const [movie, setMovie] = useState({});
  const { error, loading, setError, setLoading } = useGlobalContext();
  const { id } = useParams();

  const fetchMovie = async (url) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      if (data.Response === "False") {
        setError({ show: true, msg: data.Error });
        setLoading(false);
      } else {
        setMovie(data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovie(`${API_ENDPOINT}&i=${id}`);
  }, []);

  if (loading) {
    return <div className="loading"></div>;
  }
  if (error.show) {
    return (
      <div className="page-error">
        <h1>{error.msg}</h1>
        <Link to="/" className="btn">
          Back to movies
        </Link>
      </div>
    );
  }
  return (
    <section className="single-movie">
      <img src={movie.Poster} alt={movie.Title} />
      <div className="single-movie-info">
        <h2>{movie.Title}</h2>
        <p>{movie.Plot}</p>
        <h4>{movie.Year}</h4>
        <Link to="/" className="btn">
          back to movies
        </Link>
      </div>
    </section>
  );
};

export default SingleMovie;
