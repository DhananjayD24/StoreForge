import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

  const [cartItems, setCartItems] = useState([]);

  // ==============================
  // Add product to cart
  // ==============================

  const addToCart = (product) => {

    setCartItems((prev) => {

      const existing = prev.find((item) => item._id === product._id);

      if (existing) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      }

      return [...prev, product];

    });

  };

  // ==============================
  // Remove product
  // ==============================

  const removeFromCart = (id) => {

    setCartItems((prev) =>
      prev.filter((item) => item._id !== id)
    );

  };

  // ==============================
  // Update quantity
  // ==============================

  const updateQuantity = (id, amount) => {

    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + amount),
            }
          : item
      )
    );

  };

  // ==============================
  // Clear cart
  // ==============================

  const clearCart = () => {
    setCartItems([]);
  };

  // ==============================
  // Total Price
  // ==============================

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (

    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalPrice,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>

  );

}

export function useCart() {
  return useContext(CartContext);
}