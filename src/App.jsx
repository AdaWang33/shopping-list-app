import React, { useState } from 'react';
import { FaPlus, FaMinus, FaPlusCircle } from 'react-icons/fa';

const getColor = (serves) => {
  const maxServes = 5;
  const ratio = Math.min(serves, maxServes) / maxServes;
  return `hsl(${120 * (1 - ratio)}, 100%, 50%)`;
};

export default function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  const addItem = (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    
    setItems([...items, {
      id: Date.now(),
      name: newItem.trim(),
      serves: 1,
      section: 'toShop'
    }]);
    setNewItem('');
  };

  const moveItem = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, section: item.section === 'toShop' ? 'inStock' : 'toShop' } : item
    ));
  };

  const updateServes = (id, delta) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, serves: Math.max(1, item.serves + delta) } : item
    ));
  };

  const ListSection = ({ title, items }) => (
    <div className="section">
      <h2>{title}</h2>
      <div className="items">
        {items.map(item => (
          <div 
            key={item.id}
            className="item-card"
            style={{ background: getColor(item.serves) }}
            onClick={() => moveItem(item.id)}
          >
            <span className="item-name">{item.name}</span>
            <div className="serve-controls">
              <button 
                onClick={(e) => { e.stopPropagation(); updateServes(item.id, -1); }}
                className="serve-btn"
              >
                <FaMinus />
              </button>
              <span className="serve-count">{item.serves}</span>
              <button 
                onClick={(e) => { e.stopPropagation(); updateServes(item.id, 1); }}
                className="serve-btn"
              >
                <FaPlus />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container">
      <h1>🛒 Shopping List</h1>
      
      <form onSubmit={addItem} className="add-item-form">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add new item..."
          className="item-input"
        />
        <button type="submit" className="add-button">
          <FaPlusCircle size={24} />
        </button>
      </form>

      <ListSection 
        title="To Shop" 
        items={items.filter(item => item.section === 'toShop')} 
      />
      <ListSection 
        title="In Stock" 
        items={items.filter(item => item.section === 'inStock')} 
      />
    </div>
  );
}
