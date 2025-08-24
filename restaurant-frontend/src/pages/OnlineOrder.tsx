import { useEffect, useState } from 'react';
import '../css/OnlineOrder.css';
import delete_img from '../assets/delete.png';

interface OrderItem {
  itemId: string;
  quantity: number;
  itemName: string;
  itemPrice: number;
}

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

function OnlineOrder() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [, setSelectedMeal] = useState<string>('');
  const [, setShowTime] = useState<string>(() => {
    const date = new Date();
    return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  });

  const [orderList, setOrderList] = useState<OrderItem[]>([]);

  //Form state
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: ''
  });

  const selectMeal = (meal: string) => {
    setSelectedMeal(meal);
    fetch(`http://localhost:8080/api/menu/meal/${meal}`)
      .then(response => response.json())
      .then(data => setMenuItems(data))
      .catch(error => console.error(`Error fetching ${meal} items:`, error));
  };


  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const formattedDate =
        date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
      setShowTime(formattedDate);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    selectMeal(MenuDisplayed());
  }, []);

  const groupMenuItems = menuItems.reduce<Record<string, MenuItem[]>>(
    (acc, item) => {
      const tag = item.category;
      if (!acc[tag]) {
        acc[tag] = [];
      }
      acc[tag].push(item);
      return acc;
    },
    {}
  );

  function MenuDisplayed(): string {
    const time = new Date().getHours();
    if (time >= 6 && time < 10) {
      return 'Breakfast';
    } else if (time >= 10 && time < 17) {
      return 'Lunch';
    } else if (time >= 17 && time < 24) {
      return 'Dinner';
    } else {
      return 'Closed';
    }
  }

  function AddToCheckoutList(menuItem: MenuItem) {
    setOrderList(prevOrderList => {
      const currentItem = prevOrderList.find(
        item => item.itemId == menuItem.itemId
      );
      let updatedList;
      if (currentItem) {
        updatedList = prevOrderList.map(item =>
          item.itemId === menuItem.itemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        const newOrderItem: OrderItem = {
          itemId: menuItem.itemId,
          itemName: menuItem.itemName,
          itemPrice: menuItem.itemPrice,
          quantity: 1
        };
        updatedList = [...prevOrderList, newOrderItem];
      }
      return updatedList;
    });
  }

  function RemoveItemFromCheckout(menuItem: OrderItem) {
    setOrderList(prevOrderList => {
      const currentItem = prevOrderList.find(
        item => item.itemId === menuItem.itemId
      );
      let updatedList = prevOrderList;
      if (currentItem) {
        updatedList = prevOrderList
          .map(item =>
            item.itemId === menuItem.itemId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter(item => item.quantity > 0);
      }
      return updatedList;
    });
  }

  function HandleCheckout(e: React.FormEvent) {
    e.preventDefault();

    if (orderList.length === 0) {
      alert('Your order is empty');
      return;
    }

    // Build DTO for checkout session
    const orderDTO = {
      name: formData.name,
      phoneNumber: formData.phoneNumber,
      items: orderList.map(item => ({
        itemId: item.itemId,
        name: item.itemName,
        quantity: item.quantity,
        price: item.itemPrice
      }))
    };

    console.log('Sending order to Stripe checkout:', orderDTO);
    fetch('http://localhost:8080/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderDTO)
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to create checkout session');
        return res.json();
      })
      .then(data => {
        if (data.url) {
          // Redirect to Stripe Checkout page
          window.location.href = data.url;
        } else {
          alert('Error: No checkout URL received');
        }
      })
      .catch(err => {
        console.error(err);
        alert('Error starting checkout');
      });
  }


  const totalPrice = orderList.reduce(
    (acc, item) => acc + item.itemPrice * item.quantity,
    0
  );

  return (
    <div className="online-menu-container">
      <h1>{MenuDisplayed()}</h1>

      <div className="content-layout">
        <div className="menu-section">
          <div className="tag-sections-container">
            {Object.entries(groupMenuItems).map(([tag, items]) => (
              <div key={tag} className="tag-section">
                <h2 className="tag-heading">{tag}</h2>
                <div className="menu-grid">
                  {items.map(item => (
                    <button key={item.itemId}  className='menu-card' onClick={() => AddToCheckoutList(item)}>
                      <h3>{item.itemName}</h3>
                      {item.imageUrl && <img src={item.imageUrl} alt={item.itemName} className="tag-item-image" />}
                      <p><strong>Price:</strong> ${item.itemPrice.toFixed(2)}</p>
                      <p><em>{item.category}</em></p>
                      <p>{item.itemDescription}</p>
                      <p><strong>Available:</strong> {item.itemAvailability ? 'Yes' : 'No'}</p>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="checkout-section">
          <h1>Checkout</h1>
          {orderList.map(item => (
            <div key={item.itemId} className="checkout-list-item">
              {item.itemName} x {item.quantity} - $
              {(item.itemPrice * item.quantity).toFixed(2)}
              <button onClick={() => RemoveItemFromCheckout(item)}>
                <img
                  src={delete_img}
                  alt="Remove Item"
                  className="rm-icon"
                />
              </button>
            </div>
          ))}
          <div>
            <p>
              <strong>Total: ${totalPrice.toFixed(2)}</strong>
            </p>
            <form onSubmit={HandleCheckout} className="checkout-form">
              <div className="form-group">
                <label>Name*</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.name}
                  onChange={e =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
             
              <div className="form-group">
                <label>Phone Number*</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phoneNumber}
                  onChange={e =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                  required
                />
              </div>
              <input
                type="submit"
                value="Checkout"
                className="submit-button"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OnlineOrder;
