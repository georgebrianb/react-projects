import React, { useState, useEffect } from "react";
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from "react-icons/fa";
const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

function App() {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState(null);
  const [title, setTitle] = useState("name");
  const [value, setValue] = useState("random person");

  const handleValue = (e) => {
    if(e.target.classList.contains('icon')){

    
    const attribute = e.target.dataset.label
    if (attribute) {
      setTitle(attribute);
      setValue(person.[attribute])
    }
  }
  };

  const getUser = async () => {
    setLoading(true)
    const response = await fetch(url);
    const data = await response.json();
    const person = data.results[0];
    const { phone, email } = person;
    const { large: image } = person.picture;
    const { first, last } = person.name;
    const {
      login: { password },
    } = person;
    const {
      dob: { age },
    } = person;
    const {
      street: { number, name },
    } = person.location;

    const user = {
      name: [first, last].join(" "),
      email,
      street: [number, name].join(" "),
      age,
      phone,
      password,
      image,
    };
    console.log(user);
    setPerson(user);
    setLoading(false);
    setTitle("name");
    setValue(user.name);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          <img
            src={(person && person.image) || defaultImage}
            alt="random person"
            className="user-img"
          />
          <p className="user-title">My {title} is</p>
          <p className="user-value">{value}</p>
          <div className="values-list">
            <button
              className="icon"
              data-label="name"
              onMouseOver={(e) => handleValue(e)}
              onMouseLeave={() => {
                setTitle('name');
                setValue(person.name)
                }
              }
            >
              <FaUser />
            </button>
            <button
              className="icon"
              data-label="email"
              onMouseOver={(e) => handleValue(e)}
              onMouseLeave={() => {
                setTitle('name');
                setValue(person.name)
                }
              }
            >
              <FaEnvelopeOpen />
            </button>
            <button
              className="icon"
              data-label="age"
              onMouseOver={(e) => handleValue(e)}
            >
              <FaCalendarTimes />
            </button>
            <button
              className="icon"
              data-label="street"
              onMouseOver={(e) => handleValue(e)}
              onMouseLeave={() => {
                setTitle('name');
                setValue(person.name)
                }
              }
            >
              <FaMap />
            </button>
            <button
              className="icon"
              data-label="phone"
              onMouseOver={(e) => handleValue(e)}
              onMouseLeave={() => {
                setTitle('name');
                setValue(person.name)
                }
              }
            >
              <FaPhone />
            </button>
            <button
              className="icon"
              data-label="password"
              onMouseOver={(e) => handleValue(e)}
              onMouseLeave={() => {
                setTitle('name');
                setValue(person.name)
                }
              }
            >
              <FaLock />
            </button>
          </div>
          <button className="btn" type="button" onClick={getUser}>
            {loading ? "loading..." : "random user"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
