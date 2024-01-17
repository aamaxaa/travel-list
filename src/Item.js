export default function Item({ item, onDeleteItem, onToggleItem }) {
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
