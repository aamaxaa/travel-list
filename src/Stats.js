export default function Stats({ items }) {
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
