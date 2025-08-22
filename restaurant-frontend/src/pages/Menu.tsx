import { useEffect, useState } from 'react';
import '../css/Menu.css';

interface MenuItem {
  itemId: string;            // UUID
  itemName: string;
  itemDescription: string;
  itemPrice: number;
  itemAvailability: boolean;
  category: string;
  meal: string;
  imageUrl: string;
}

function Menu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedMeal] = useState<string>(''); 
  


  const selectMeal = (meal: string) => {
    setSelectedMeal(meal);
    fetch(`http://localhost:8080/api/menu/meal/${meal}`)
      .then(response => response.json())
      .then(data => setMenuItems(data))
      .catch(error => console.error(`Error fetching ${meal} items:`, error));
  };

  const groupMenuItems = menuItems.reduce<Record<string, MenuItem[]>>((acc, item) => {
    const tag = item.category;
    if (!acc[tag]) {
      acc[tag] = [];
    }
    acc[tag].push(item);
    return acc;
  }, {});


  useEffect(() => {
    selectMeal('Breakfast');
  }, []);

  return (
    <div className="menu-container">
      <div className='title-and-buttons'>
        <h1 className="menu-title">Menu</h1>
        <div className='category-buttons'>
          <button
            onClick={() => selectMeal("Breakfast")}
            className={selectedCategory === "Breakfast" ? "active" : ""}
          >
            Breakfast
          </button>
          <button
            onClick={() => selectMeal("Lunch")}
            className={selectedCategory === "Lunch" ? "active" : ""}
          >
            Lunch
          </button>
          <button
            onClick={() => selectMeal("Dinner")}
            className={selectedCategory === "Dinner" ? "active" : ""}
          >
            Dinner
          </button>
        </div>
      </div>
          <div className="tag-sections-container">
            {Object.entries(groupMenuItems).map(([tag, items]) => (
              <div key={tag} className="tag-section">
                <h2 className="tag-heading">{tag}</h2>
                <div className="menu-grid">
                  {items.map(item => (
                    <div key={item.itemId} className="menu-card">
                      <h3>{item.itemName}</h3>
                      {item.imageUrl && <img src={item.imageUrl} alt={item.itemName} className="tag-item-image" />}
                      <p><strong>Price:</strong> ${item.itemPrice.toFixed(2)}</p>
                      <p><em>{item.category}</em></p>
                      <p>{item.itemDescription}</p>
                      <p><strong>Available:</strong> {item.itemAvailability ? 'Yes' : 'No'}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
      </div>
  );
}

export default Menu;
