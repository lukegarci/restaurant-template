import { useEffect, useState } from 'react';
import '../css/Menu.css';

interface MenuItem {
  itemid: number;
  name: string;
  description: string;
  price: number;
  availability: boolean;
  foodtags: string;
  category: string;
  imageurl: string;
}


function Menu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/menu')
      .then(response => response.json())
      .then(data => setMenuItems(data))
      .catch(error => console.error('Error fetching menu:', error));
  }, []);

  const selectCategory = (category: string) =>{
      fetch(`http://localhost:8080/api/menu/category/${category}`)
      .then(response => response.json())
      .then(data => setMenuItems(data))
      .catch(error => console.error('Error fetching ${category} items:',error));
  }


  return (
    <div className="menu-container">
      <div className='title-and-buttons'>
        <h1 className="menu-title">Menu</h1>
        <div className='category-buttons'>
          <button onClick={()=>selectCategory("Breakfast")}>Breakfast</button>
          <button onClick={()=>selectCategory("Lunch")}>Lunch</button>
          <button onClick={()=>selectCategory("Dinner")}>Dinner</button>
        </div>
      </div>
      <div className="menu-grid">
        {menuItems.map(item => (
          <div key={item.itemid} className="menu-card">
            {item.imageurl && (
              <img src={item.imageurl} alt={item.name} />
            )}
            <h2>{item.name}</h2>
            <p><strong>${item.price.toFixed(2)}</strong></p>
            <p><em>{item.category}</em></p>
            <p>{item.description}</p>
            <p><strong>Available:</strong> {item.availability ? 'Yes' : 'No'}</p>
            <p><strong>Tags:</strong> {item.foodtags}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
