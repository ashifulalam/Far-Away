import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
//   { id: 3, description: "Charger", quantity: 2, packed: false },
// ];

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <div>
      <Logo />
      <Form onAddItems={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Status items = {items} />
    </div>
  );
}

function Logo() {
  return <h1>🏝️ Far Away 🧳</h1>;
}
function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(5);

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(e);

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    //console.log(newItem);

    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip ?</h3>
      <select
        value={quantity}
        onChange={(num) => setQuantity(Number(num.target.value))}
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
  const[sortBy, setSortBy] = useState('input');

  let sortedItem ;

  if(sortBy === 'input') {
    sortedItem = items;
  }
  if(sortBy === 'description') {
    sortedItem = items.slice().sort((a,b) => a.description.localeCompare(b.description));
  }

  if(sortBy ==='packed'){
    sortedItem = items.slice().sort((a,b) => Number(a.packed) - Number(b.packed));
  }

  return (
    <div className="list">
      <ul>
        {sortedItem.map((item) => {
          return (
            <Item
              item={item}
              onDeleteItem={onDeleteItem}
              key={item.id}
              onToggleItem={onToggleItem}
            />
          );
        })}
      </ul>

      <div className="actions">
       <select value ={ sortBy } onChange={(e) => setSortBy(e.target.value)} >
        <option value="input">Sort by input order</option>
        <option value="description">Sort by description</option>
        <option value="packed">Sort by packed status</option>
       </select> 
      </div>

    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Status({items}) {

  if(!items.length){
    return(
      <p className="stats">
        <em> Start adding some items to your packing list 🚀</em>
      </p>
    )
  }

  const numItems = items.length
  const numPacked = items.filter( item => item.packed).length;
  const percentage = numItems === 0 ? 0 : Math.round((numPacked / numItems) * 100);
  
  return (
    <footer className="stats">
      <em> { percentage === 100 ? "Bye Bye For Today 💨 🏃🏻 " :
         `💼 You have ${numItems} items on your list, and you already packed ${numPacked} (${percentage}%)`} </em>
    </footer>
  );
}
