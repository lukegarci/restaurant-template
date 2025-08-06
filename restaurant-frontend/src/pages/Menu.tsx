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
  const [selectedCategory, setSelectedCategory] = useState<string>(''); 
  


  const selectCategory = (category: string) => {
    setSelectedCategory(category);
    fetch(`http://localhost:8080/api/menu/category/${category}`)
      .then(response => response.json())
      .then(data => setMenuItems(data))
      .catch(error => console.error(`Error fetching ${category} items:`, error));
  };

  const groupMenuItems = menuItems.reduce<Record<string, MenuItem[]>>((acc, item) => {
    const tag = item.foodtags;
    if (!acc[tag]) {
      acc[tag] = [];
    }
    acc[tag].push(item);
    return acc;
  }, {});


  useEffect(() => {
    selectCategory('breakfast');
  }, []);

  return (
    <div className="menu-container">
      <div className='title-and-buttons'>
        <h1 className="menu-title">Menu</h1>
        <div className='category-buttons'>
          <button
            onClick={() => selectCategory("breakfast")}
            className={selectedCategory === "breakfast" ? "active" : ""}
          >
            Breakfast
          </button>
          <button
            onClick={() => selectCategory("lunch")}
            className={selectedCategory === "lunch" ? "active" : ""}
          >
            Lunch
          </button>
          <button
            onClick={() => selectCategory("dinner")}
            className={selectedCategory === "dinner" ? "active" : ""}
          >
            Dinner
          </button>
        </div>
      </div>

          {Object.entries(groupMenuItems).map(([tag, items]) => (
            <div key={tag} className="tag-section">
              <h2 className="tag-heading">{tag.toUpperCase()}</h2>
              <div className="menu-grid"> {}
                {items.map(item => (
                  <div key={item.itemid} className="menu-card">
                    <h3>{item.name}</h3>
                    {item.imageurl && <img src={item.imageurl} alt={item.name} className="tag-item-image" />}
                    <p><strong>Price:</strong> ${item.price.toFixed(2)}</p>
                    <p><em>{item.category}</em></p>
                    <p>{item.description}</p>
                    <p><strong>Available:</strong> {item.availability ? 'Yes' : 'No'}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
  );
}

export default Menu;
