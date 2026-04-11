import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { categories, dashboardStats, products, reviews } from "../data/mockData.js";

const StoreContext = createContext(null);

const savedUser = localStorage.getItem("shopsphere_user");
const initialState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  token: localStorage.getItem("shopsphere_token"),
  products,
  categories,
  reviews,
  wishlist: [],
  cart: [],
  orders: [],
  dashboardStats,
  searchTerm: "",
  notifications: [],
  loading: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_SEARCH":
      return { ...state, searchTerm: action.payload };
    case "LOGIN":
      return { ...state, user: action.payload.user, token: action.payload.token };
    case "LOGOUT":
      return { ...state, user: null, token: null, cart: [], wishlist: [], orders: [] };
    case "ADD_TO_CART": {
      const exists = state.cart.find((item) => item.id === action.payload.id);
      const cart = exists
        ? state.cart.map((item) => item.id === action.payload.id ? { ...item, quantity: Math.min(item.quantity + action.payload.quantity, item.stock) } : item)
        : [...state.cart, { ...action.payload }];
      return { ...state, cart, notifications: [...state.notifications, { id: Date.now(), type: 'success', message: `${action.payload.name} added to cart` }] };
    }
    case "UPDATE_CART":
      return { ...state, cart: state.cart.map((item) => item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item) };
    case "REMOVE_FROM_CART":
      return { ...state, cart: state.cart.filter((item) => item.id !== action.payload), notifications: [...state.notifications, { id: Date.now(), type: 'info', message: 'Item removed from cart' }] };
    case "TOGGLE_WISHLIST":
      return state.wishlist.some((item) => item.id === action.payload.id)
        ? { ...state, wishlist: state.wishlist.filter((item) => item.id !== action.payload.id), notifications: [...state.notifications, { id: Date.now(), type: 'info', message: 'Removed from wishlist' }] }
        : { ...state, wishlist: [...state.wishlist, action.payload], notifications: [...state.notifications, { id: Date.now(), type: 'success', message: 'Added to wishlist' }] };
    case "ADD_REVIEW": {
      const current = state.reviews[action.payload.productId] || [];
      return { ...state, reviews: { ...state.reviews, [action.payload.productId]: [action.payload.review, ...current] }, notifications: [...state.notifications, { id: Date.now(), type: 'success', message: 'Review submitted successfully' }] };
    }
    case "PLACE_ORDER":
      return { ...state, orders: [action.payload, ...state.orders], cart: [], notifications: [...state.notifications, { id: Date.now(), type: 'success', message: `Order #${action.payload.id} placed successfully` }] };
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

  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export const useStore = () => useContext(StoreContext);
