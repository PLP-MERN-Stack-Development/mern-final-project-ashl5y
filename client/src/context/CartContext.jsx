import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (error) {
        console.error('Error parsing stored cart data:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);
  
  useEffect(() => {
    const count = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    
    setItemCount(count);
    setCartTotal(total);
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);
  
  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item._id === product._id);
      
      if (existingItem) {
        toast.info(`Updated ${product.name} quantity in your cart`);
        return prevItems.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        toast.success(`${product.name} added to your cart`);
        return [...prevItems, { ...product, quantity }];
      }
    });
  };
  
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === productId ? { ...item, quantity } : item
      )
    );
  };
  
  const removeFromCart = (productId) => {
    setCartItems(prevItems => {
      const itemToRemove = prevItems.find(item => item._id === productId);
      if (itemToRemove) {
        toast.info(`${itemToRemove.name} removed from your cart`);
      }
      return prevItems.filter(item => item._id !== productId);
    });
  };
  
  const clearCart = () => {
    setCartItems([]);
    toast.info('Your cart has been cleared');
  };
  
  return (
    <CartContext.Provider
      value={{
        cartItems,
        itemCount,
        cartTotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};