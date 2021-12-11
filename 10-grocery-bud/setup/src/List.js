import React from "react";
import Item from "./Item";

const List = ({ itemList, clearList, removeItem, editItem }) => {
  return (
    <div className="grocery-container">
      <div className="grocery-list">
        {itemList.map((item) => {
          const { id, title } = item;
          return (
            <Item
              key={id}
              title={title}
              removeItem={removeItem}
              id={id}
              editItem={editItem}
            />
          );
        })}
      </div>
      <button className="clear-btn" onClick={clearList}>
        Clear Items
      </button>
    </div>
  );
};

export default List;
