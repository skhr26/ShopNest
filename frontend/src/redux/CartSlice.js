import { createSlice } from "@reduxjs/toolkit";

const getStoredCartItems = () => {
  try {
    const storedItems = localStorage.getItem('cartItems');
    return storedItems ? JSON.parse(storedItems) : [];
  } catch (error) {
    console.error('Failed to parse cart items:', error);
    return [];
  }
};

const initialState = {
  cartItems: getStoredCartItems(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const items = action.payload;
      const itemId = items.productId || items._id;
      const existItem = state.cartItems.find((x) => (x.productId || x._id) === itemId);

      if (existItem) {
        // means basically kisi item ki koi chiz id match kar bhi rhi hai to hame kuch aur nhi karna hai hame bas usee leke rkhna hai
        state.cartItems = state.cartItems.map((x) =>
          (x.productId || x._id) === itemId ? { ...x, ...items } : x
        );
      } else {
        state.cartItems = [...state.cartItems, items];
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((x) => (x.productId || x._id) !== itemId);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem('cartItems');
    }
  }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;