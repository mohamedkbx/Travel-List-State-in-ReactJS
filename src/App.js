import { useState } from "react";
import Logo from "./components/Logo";
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";

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

export default App;
