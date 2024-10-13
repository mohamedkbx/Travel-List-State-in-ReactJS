export default function Item({ item, onHnadleDelete, onHandleToggle }) {
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
