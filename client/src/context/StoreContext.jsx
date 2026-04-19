import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { categories, dashboardStats, products, reviews } from "../data/mockData.js";
import { apiRequest } from "../api/client.js";

const StoreContext = createContext(null);

const savedUser = localStorage.getItem("shopsphere_user");
const savedToken = localStorage.getItem("shopsphere_token");
const savedOrders = localStorage.getItem("shopsphere_orders");
const initialState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  token: savedToken,
  products,
  categories,
  reviews,
  wishlist: [],
  cart: [],
  orders: savedOrders ? JSON.parse(savedOrders) : [],
  dashboardStats,
  searchTerm: "",
  notifications: [],
  loading: false
};

// Cart API functions
const fetchCart = async (token) => {
  try {
    const cart = await apiRequest("/cart", {}, token);
    return cart;
  } catch (error) {
    console.error("Failed to fetch cart:", error);
    return [];
  }
};

const fetchOrders = async (token) => {
  try {
    const orders = await apiRequest("/orders", {}, token);
    return orders;
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return [];
  }
};

const addToCartAPI = async (productId, quantity, token) => {
  await apiRequest("/cart", {
    method: "POST",
    body: JSON.stringify({ productId, quantity })
  }, token);
};

const removeFromCartAPI = async (productId, token) => {
  await apiRequest(`/cart/${productId}`, { method: "DELETE" }, token);
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_SEARCH":
      return { ...state, searchTerm: action.payload };
    case "LOGIN":
      return { ...state, user: action.payload.user, token: action.payload.token };
    case "LOGOUT":
      return { ...state, user: null, token: null, cart: [], wishlist: [] };
    case "SET_CART":
      return { ...state, cart: action.payload };
    case "ADD_TO_CART": {
      const exists = state.cart.find((item) => item.product_id === action.payload.product_id);
      const cart = exists
        ? state.cart.map((item) => item.product_id === action.payload.product_id ? { ...item, quantity: Math.min(item.quantity + action.payload.quantity, item.stock) } : item)
        : [...state.cart, { ...action.payload }];
      return { ...state, cart, notifications: [...state.notifications, { id: Date.now(), type: 'success', message: `${action.payload.name} added to cart` }] };
    }
    case "UPDATE_CART":
      return { ...state, cart: state.cart.map((item) => item.product_id === action.payload.product_id ? { ...item, quantity: action.payload.quantity } : item) };
    case "REMOVE_FROM_CART":
      return { ...state, cart: state.cart.filter((item) => item.product_id !== action.payload), notifications: [...state.notifications, { id: Date.now(), type: 'info', message: 'Item removed from cart' }] };
    case "TOGGLE_WISHLIST":
      return state.wishlist.some((item) => item.id === action.payload.id)
        ? { ...state, wishlist: state.wishlist.filter((item) => item.id !== action.payload.id), notifications: [...state.notifications, { id: Date.now(), type: 'info', message: 'Removed from wishlist' }] }
        : { ...state, wishlist: [...state.wishlist, action.payload], notifications: [...state.notifications, { id: Date.now(), type: 'success', message: 'Added to wishlist' }] };
    case "ADD_REVIEW": {
      const current = state.reviews[action.payload.productId] || [];
      return { ...state, reviews: { ...state.reviews, [action.payload.productId]: [action.payload.review, ...current] }, notifications: [...state.notifications, { id: Date.now(), type: 'success', message: 'Review submitted successfully' }] };
    }
    case "SET_ORDERS":
      localStorage.setItem("shopsphere_orders", JSON.stringify(action.payload));
      return { ...state, orders: action.payload };
    case "PLACE_ORDER":
      const newOrders = [action.payload, ...state.orders];
      localStorage.setItem("shopsphere_orders", JSON.stringify(newOrders));
      return { ...state, orders: newOrders, cart: [], notifications: [...state.notifications, { id: Date.now(), type: 'success', message: `Order #${action.payload.id} placed successfully` }] };
    case "DISMISS_NOTIFICATION":
      return { ...state, notifications: state.notifications.slice(1) };
    case "ADD_NOTIFICATION":
      return { ...state, notifications: [...state.notifications, { id: Date.now(), ...action.payload }] };
    case "UPDATE_PROFILE":
      return { ...state, user: { ...state.user, ...action.payload }, notifications: [...state.notifications, { id: Date.now(), type: 'success', message: 'Profile updated successfully' }] };
    default:
      return state;
  }
};

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Fetch cart and orders when user logs in
  useEffect(() => {
    if (state.user && state.token) {
      fetchCart(state.token).then(cart => {
        dispatch({ type: "SET_CART", payload: cart });
      });
      fetchOrders(state.token).then(orders => {
        // Only update orders if API returns data, otherwise keep local orders
        if (orders && orders.length > 0) {
          dispatch({ type: "SET_ORDERS", payload: orders });
        }
      });
    }
  }, [state.user, state.token]);

  useEffect(() => {
    if (state.user) {
      localStorage.setItem("shopsphere_user", JSON.stringify(state.user));
      localStorage.setItem("shopsphere_token", state.token || "");
    } else {
      localStorage.removeItem("shopsphere_user");
      localStorage.removeItem("shopsphere_token");
    }
  }, [state.user, state.token]);

  useEffect(() => {
    if (!state.notifications.length) return;
    const timer = setTimeout(() => dispatch({ type: "DISMISS_NOTIFICATION" }), 4000);
    return () => clearTimeout(timer);
  }, [state.notifications]);

  // Async action creators
  const addToCart = async (product, quantity = 1) => {
    if (!state.token) return;
    try {
      await addToCartAPI(product.id, quantity, state.token);
      // Fetch updated cart from API
      const updatedCart = await fetchCart(state.token);
      dispatch({ type: "SET_CART", payload: updatedCart });
    } catch (error) {
      console.error("Failed to add to cart:", error);
      dispatch({ type: "ADD_NOTIFICATION", payload: { type: "error", message: "Failed to add item to cart" } });
    }
  };

  const removeFromCart = async (productId) => {
    if (!state.token) return;
    try {
      await removeFromCartAPI(productId, state.token);
      // Fetch updated cart from API
      const updatedCart = await fetchCart(state.token);
      dispatch({ type: "SET_CART", payload: updatedCart });
    } catch (error) {
      console.error("Failed to remove from cart:", error);
      dispatch({ type: "ADD_NOTIFICATION", payload: { type: "error", message: "Failed to remove item from cart" } });
    }
  };

  const value = useMemo(() => {
    const userOrders = state.user ? state.orders.filter(order => order.user_id === state.user.id) : [];
    return { 
      state: { ...state, userOrders }, 
      dispatch, 
      addToCart, 
      removeFromCart 
    };
  }, [state]);
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export const useStore = () => useContext(StoreContext);
