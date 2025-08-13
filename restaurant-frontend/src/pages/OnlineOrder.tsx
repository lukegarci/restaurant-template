import { useEffect, useState } from 'react';
import '../css/OnlineOrder.css';
import delete_img from '../assets/delete.png';

interface OrderItem {
  itemid: number;
  name: string;
  price: number;
  quantity: number;
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

function OnlineOrder() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [, setSelectedCategory] = useState<string>('');
  const [, setShowTime] = useState<string>(() => {
    const date = new Date();
    return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  });

  const [orderList, setOrderList] = useState<OrderItem[]>([]);

  //Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: ''
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
      const formattedDate =
        date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
      setShowTime(formattedDate);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    selectCategory(MenuDisplayed());
  }, []);

  const groupMenuItems = menuItems.reduce<Record<string, MenuItem[]>>(
    (acc, item) => {
      const tag = item.foodtags;
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
      return 'breakfast';
    } else if (time >= 10 && time < 17) {
      return 'lunch';
    } else if (time >= 17 && time < 24) {
      return 'dinner';
    } else {
      return 'Closed';
    }
  }

  function AddToCheckoutList(menuItem: MenuItem) {
    setOrderList(prevOrderList => {
      const currentItem = prevOrderList.find(
        item => item.itemid == menuItem.itemid
      );
      let updatedList;
      if (currentItem) {
        updatedList = prevOrderList.map(item =>
          item.itemid === menuItem.itemid
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        const newOrderItem: OrderItem = {
          itemid: menuItem.itemid,
          name: menuItem.name,
          price: menuItem.price,
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
        item => item.itemid === menuItem.itemid
      );
      let updatedList = prevOrderList;
      if (currentItem) {
        updatedList = prevOrderList
          .map(item =>
            item.itemid === menuItem.itemid
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

    // Build DTO
    const orderDTO = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
      items: orderList.map(item => ({
        itemId: item.itemid,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }))
    };

    console.log('Order DTO to send:', orderDTO);

    // Example POST request
    fetch('http://localhost:8080/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderDTO)
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to place order');
        return res.json();
      })
      .then(data => {
        alert('Order placed successfully!');
        console.log('Response:', data);
        setOrderList([]);
        setFormData({ firstName: '', lastName: '', phoneNumber: '' });
      })
      .catch(err => {
        console.error(err);
        alert('Error placing order');
      });
  }

  const totalPrice = orderList.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="online-menu-container">
      <h1>{MenuDisplayed().toUpperCase()}</h1>

      <div className="content-layout">
        <div className="menu-section">
          {Object.entries(groupMenuItems).map(([tag, items]) => (
            <div key={tag} className="tag-section">
              <h2 className="tag-heading">{tag.toUpperCase()}</h2>
              <div className="menu-grid">
                {items.map(item => (
                  <button
                    key={item.itemid}
                    className="menu-card"
                    onClick={() => AddToCheckoutList(item)}
                  >
                    <h3>{item.name}</h3>
                    {item.imageurl && (
                      <img
                        src={item.imageurl}
                        alt={item.name}
                        className="tag-item-image"
                      />
                    )}
                    <p>
                      <strong>Price:</strong> ${item.price.toFixed(2)}
                    </p>
                    <p>
                      <em>{item.category}</em>
                    </p>
                    <p>{item.description}</p>
                    <p>
                      <strong>Available:</strong>{' '}
                      {item.availability ? 'Yes' : 'No'}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="checkout-section">
          <h1>Checkout</h1>
          {orderList.map(item => (
            <div key={item.itemid} className="checkout-list-item">
              {item.name} x {item.quantity} - $
              {(item.price * item.quantity).toFixed(2)}
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
                <label>First Name*</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.firstName}
                  onChange={e =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name*</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.lastName}
                  onChange={e =>
                    setFormData({ ...formData, lastName: e.target.value })
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
