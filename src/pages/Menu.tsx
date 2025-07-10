import React, { useEffect, useState } from 'react';

interface MenuItem {
  itemid: number;
  name: string;
  description: string;
  price: number;
  availability: boolean;
  foodtags: string;
  category: string;
}

function Menu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/menu')
      .then(response => response.json())
      .then(data => setMenuItems(data))
      .catch(error => console.error('Error fetching menu:', error));
  }, []);

  return (
    <div>
      <h1>Restaurant Menu</h1>
      {menuItems.map(item => (
        <div key={item.itemid} style={{ marginBottom: '1rem' }}>
          <h2>{item.name} - ${item.price.toFixed(2)}</h2>
          <p><strong>Category:</strong> {item.category}</p>
          <p>{item.description}</p>
          <p><strong>Available:</strong> {item.availability ? 'Yes' : 'No'}</p>
          <p><strong>Tags:</strong> {item.foodtags}</p>
        </div>
      ))}
    </div>
  );
}

export default Menu;
