import { useState } from "react";

export default function App() {
  const [theme, setTheme] = useState("warm");
  const [items, setItems] = useState([]);

  function handleChangeTheme() {
    setTheme((theme) => (theme === "warm" ? "cool" : "warm"));
  }
  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) => {
        if (item.id !== id) return item;
        return { ...item, packed: !item.packed };
      })
    );
  }

  return (
    <div className="app">
      <Logo onChangeTheme={handleChangeTheme} />
      <Form onAddItems={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo({ onChangeTheme }) {
  function handleClick() {}
  return <h1 onClick={handleClick}>🏄 Far Away ⛷️</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What would you need for the trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  function handleDelete() {
    onDeleteItem(item.id);
  }
  function handleToggle() {
    onToggleItem(item.id);
  }

  return (
    <li>
      <input type="checkbox" checked={item.packed} onChange={handleToggle} />
      <span
        onClick={() => handleToggle()}
        style={item.packed ? { textDecoration: "line-through" } : {}}
      >
        {item.quantity} {item.description}
      </span>
      <button onClick={() => handleDelete(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Let's add some items to the packing list!</em>
      </p>
    );

  const totalItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const packedPercentage = Math.round(packedItems / totalItems) * 100;
  return (
    <footer className="stats">
      <em>
        {packedPercentage === 100
          ? "Done! You have packed everything. Let's get going! 🚗"
          : `You have ${totalItems} items on your list, and you already packed ${packedItems} (${
              packedPercentage ? String(packedPercentage) + "%" : "0%"
            })`}
      </em>
    </footer>
  );
}
