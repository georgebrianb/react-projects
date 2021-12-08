import React, { useState } from "react";
import Menu from "./Menu";
import Categories from "./Categories";
import items from "./data";

const allCategories = ["all", ...new Set(items.map((item) => item.category))];

function App() {
  const [menuItems, setmenuItems] = useState(items);
  const [categories, setcategories] = useState(allCategories);
  const filterItems = (category) => {
    if (category === "all") {
      setmenuItems(items);
      return;
    }
    const newItems = items.filter((item) => item.category === category);
    setmenuItems(newItems);
  };
  return (
    <main>
      <section className="menu section">
        <div className="title">
          <h2 className="title">Our Menu</h2>
          <div className="underline"></div>
        </div>
        <div className="btn-container">
          <Categories categories={categories} filterItems={filterItems} />
        </div>
        <Menu items={menuItems} />
      </section>
    </main>
  );
}

export default App;
