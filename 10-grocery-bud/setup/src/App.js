import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  let itemList = localStorage.getItem("itemList");
  if (itemList) {
    return JSON.parse(itemList);
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [itemList, setItemList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const handleChange = (e) => {
    const value = e.target.value;
    setName(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      // display alert
      showAlert(true, "danger", "Please enter a value");
    } else if (name && isEditing) {
      // deal with edit
      setItemList(
        itemList.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditId(null);
      setIsEditing(false);
      showAlert(true, "success", "value changed");
    } else {
      // show alert
      showAlert(true, "success", "Item added to the list!");
      // add item to the list
      const newItem = { id: new Date().getTime().toString(), title: name };
      setItemList([...itemList, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, "danger", "empty");
    setItemList([]);
  };

  const removeItem = (id) => {
    showAlert(true, "danger", "Item removed");
    setItemList(itemList.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const specificItem = itemList.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(specificItem.title);
  };

  useEffect(() => {
    localStorage.setItem("itemList", JSON.stringify(itemList));
  }, [itemList]);

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && (
          <Alert {...alert} removeAlert={showAlert} itemList={itemList} />
        )}
        <h3>Grocery Bud</h3>
        <div className="form-control">
          <input
            className="grocery"
            type="text"
            placeholder="e.g. eggs"
            value={name}
            onChange={handleChange}
          />
          <button className="submit-btn" type="submit">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {itemList.length !== 0 && (
        <List
          itemList={itemList}
          clearList={clearList}
          removeItem={removeItem}
          editItem={editItem}
        />
      )}
    </section>
  );
}

export default App;
