# [🛒 Savat Funksiyalari](https://github.com/abdulloyev/web-telegram-bot/blob/main/src/App.jsx)

- _Loyihada mahsulotlar savatini boshqarish uchun quyidagi funksiyalar ishlatiladi:_

## 1. ✅ Savatga Mahsulot Qo'shish - `onAddItem()`

```javascript
const onAddItem = item => {
  // Savatda mahsulot borligini tekshiramiz
  const existItem = cartItems.find(i => i.id === item.id);

  if (existItem) {
    // Agar mahsulot allaqachon savatda bo'lsa, sonini 1 ga oshiramiz
    const updatedCart = cartItems.map(i =>
      i.id === item.id ? { ...existItem, quantity: existItem.quantity + 1 } : i
    );
    setCartItems(updatedCart);
  } else {
    // Yangi mahsulotni savatga qo'shamiz
    setCartItems([...cartItems, { ...item, quantity: 1 }]);
  }
};
```

## 2. 🚫 Savatdan Mahsulot Olib Tashlash - `onRemoveItem()`:

```javascript
const onRemoveItem = item => {
  // Savatda mahsulot borligini tekshiramiz
  const existItem = cartItems.find(c => c.id === item.id);

  if (existItem.quantity === 1) {
    // Agar mahsulot soni 1 bo'lsa, butunlay olib tashlaymiz
    setCartItems(cartItems.filter(c => c.id !== existItem.id));
  } else {
    // Mahsulot sonini 1 ga kamaytiramiz
    setCartItems(
      cartItems.map(c =>
        c.id === existItem.id
          ? { ...existItem, quantity: existItem.quantity - 1 }
          : c
      )
    );
  }
};
```
