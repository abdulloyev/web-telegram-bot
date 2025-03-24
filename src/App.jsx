import "./App.css";

import React, { useState } from "react";
import { getData } from "./constants/db";
import Card from "./components/card/card";
import Cart from "./components/payme-cart/cart";

const App = () => {
  // Courses contained dataBase
  const courses = getData();

  // useState
  const [cartItems, setCartItems] = useState([]);
  console.log(cartItems);

  // Add Item
  const onAddItem = item => {
    const existItem = cartItems.find(i => i.id === item.id);

    if (existItem) {
      const data = cartItems.map(i =>
        i.id == item.id ? { ...existItem, quantity: existItem.quantity + 1 } : i
      );
      setCartItems(data);
    } else {
      const newData = [...cartItems, { ...item, quantity: 1 }];
      setCartItems(newData);
    }
  };

  // Remove Item
  const onRemoveItem = item => {
    const existItem = cartItems.find(c => c.id == item.id);

    if (existItem.quantity === 1) {
      const newData = cartItems.filter(c => c.id !== existItem.id);
      setCartItems(newData);
    } else {
      const newData = cartItems.map(c =>
        c.id === existItem.id
          ? { ...existItem, quantity: existItem.quantity - 1 }
          : c
      );
      setCartItems(newData);
    }
  };

  return (
    <>
      <h1 className="heading">Sammi kurslari</h1>
      {/* Payme Cart */}
      <Cart cartItems={[]} onCheckout={() => {}} />

      {/* Cards */}
      <div className="cards_container">
        {courses.map(course => (
          <Card
            key={course.id}
            course={course}
            onAddItem={onAddItem}
            onRemoveItem={onRemoveItem}
          />
        ))}
      </div>
    </>
  );
};

export default App;
