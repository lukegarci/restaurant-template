import { useEffect, useState } from 'react';
import '../css/OnlineOrder.css';

interface OnlineOrder{
    firstName:string;
    lastName:string;
    phoneNumber:number;
    orderList:string;        
}

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
    

function OnlineOrder (){
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [, setSelectedCategory] = useState<string>(''); 

    const [,setShowTime] = useState<string>(() => {
        const date = new Date();
        return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    });
    
    const selectCategory = (category: string) => {
        setSelectedCategory(category);
        fetch(`http://localhost:8080/api/menu/category/${category}`)
        .then(response => response.json())
        .then(data => setMenuItems(data))
        .catch(error => console.error(`Error fetching ${category} items:`, error));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const date = new Date();
            const formattedDate = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            setShowTime(formattedDate)
        },1000);
        return () => clearInterval(interval);
    },[]);

    useEffect(() => {
    selectCategory(MenuDisplayed());
    }, []);

    const groupMenuItems = menuItems.reduce<Record<string, MenuItem[]>>((acc, item) => {
        const tag = item.foodtags;
        if (!acc[tag]) {
        acc[tag] = [];
        }
        acc[tag].push(item);
        return acc;
     }, {});



    function MenuDisplayed(): string{
        const time = new Date().getHours();
        if (time >= 6 && time < 10){
            return 'breakfast';
        } else if (time >= 10 && time < 17){
            return 'lunch';
        } else if (time >= 17 && time < 24){
            return 'dinner';
        } else {
            return 'Closed';
        }
    }

    return (
        <div className="online-menu-container">
          {Object.entries(groupMenuItems).map(([tag, items]) => (
            <div key={tag} className="tag-section">
              <h2 className="tag-heading">{tag.toUpperCase()}</h2>
              <div className="menu-grid"> {}
                {items.map(item => (
                  <button key={item.itemid} className="menu-card">
                    <h3>{item.name}</h3>
                    {item.imageurl && <img src={item.imageurl} alt={item.name} className="tag-item-image" />}
                    <p><strong>Price:</strong> ${item.price.toFixed(2)}</p>
                    <p><em>{item.category}</em></p>
                    <p>{item.description}</p>
                    <p><strong>Available:</strong> {item.availability ? 'Yes' : 'No'}</p>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>


    )
}

export default OnlineOrder;