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

  return (
    <div className="app">
      <Logo />
      <Form setItems={setItems} />
      <PackingList onHnadleDelete={handleDeleteItem} items={items} />
      <Stats />
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
function PackingList({ onHnadleDelete, items }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => {
          return <Item key={item.id} item={item} onHnadleDelete={onHnadleDelete} />;
        })}
      </ul>
    </div>
  );
}

function Item({ item, onHnadleDelete }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through", opacity: 0.5 } : {}}>
        {item.description} {item.quantity}
      </span>
      <button onClick={() => onHnadleDelete(item.id)}>❌</button>
    </li>
  );
}
function Stats() {
  return (
    <footer className="stats">
      <em>💼 You have X items in your List , and you already packed X </em>{" "}
    </footer>
  );
}

export default App;
