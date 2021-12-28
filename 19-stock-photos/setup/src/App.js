import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);

  const fetchImages = async () => {
    setLoading(true);
    let url;
    url = `${mainUrl}${clientID}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setPhotos(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hello");
  };

  useEffect(() => {
    fetchImages();
  }, []);
  return (
    <main>
      <section className="search">
        <form className="search-form">
          <input type="text" className="form-input" placeholder="search" />
          <button className="submit-btn" type="submit" onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {photos.map((photo) => {
            console.log(photo);
            return <Photo key={photo.id} {...photo} />;
          })}
        </div>
        {loading && <h2 className="loading">loading</h2>}
      </section>
    </main>
  );
}

export default App;
