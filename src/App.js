import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
// ];

function App() {
  const [items, setItems] = useState([]);

  function handleDeleteItem(id) {
    const newItems = [...items];
    setItems(newItems.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems(items.map((item) => (item.id === id ? { ...item, packed: !item.packed } : item)));
  }
  return (
    <div className="app">
      <Logo />
      <Form setItems={setItems} />
      <PackingList
        setItems={setItems}
        onHnadleDelete={handleDeleteItem}
        items={items}
        onHandleToggle={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴Far Away👜</h1>;
}
function Form({ setItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    handleAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={(e) => handleSubmit(e)}>
      <h3>What do uou need for your 😍 Trip ?</h3>
      <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((item) => {
          return (
            <option value={item} key={item}>
              {item}
            </option>
          );
        })}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
function PackingList({ setItems, onHnadleDelete, items, onHandleToggle }) {
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

function Item({ item, onHnadleDelete, onHandleToggle }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => {
          onHandleToggle(item.id);
        }}
      />
      <span style={item.packed ? { textDecoration: "line-through", opacity: 0.5 } : {}}>
        {item.description} {item.quantity}
      </span>
      <button onClick={() => onHnadleDelete(item.id)}>❌</button>
    </li>
  );
}
function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start Adding some items to your packing list 🚀</em>
      </p>
    );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything ready to go ✈️"
          : `
        💼 You have ${numItems} items in your List , and you already packed ${numPacked} (${percentage}
        % )`}
      </em>
    </footer>
  );
}

export default App;
