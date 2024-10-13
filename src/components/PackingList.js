import { useState } from "react";
import Item from "./Item";
export default function PackingList({ setItems, onHnadleDelete, items, onHandleToggle }) {
  const [sortBy, setSortBy] = useState("packed ");

  let sortedItems = [...items];

  if (sortBy === "description") {
    sortedItems.sort((a, b) => a.description.localeCompare(b.description));
  }

  if (sortBy === "packed") {
    sortedItems.sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  function handleResetList() {
    const confirm = window.confirm("Are you sure you want to clear the list ?");
    confirm && setItems([]);
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => {
          return (
            <Item
              key={item.id}
              item={item}
              onHnadleDelete={onHnadleDelete}
              onHandleToggle={onHandleToggle}
            />
          );
        })}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by Description </option>
          <option value="packed">Sort by Packed status </option>
        </select>
        <button onClick={handleResetList}>Clear List</button>
      </div>
    </div>
  );
}
