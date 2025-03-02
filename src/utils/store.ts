import { ActionsType, CartType } from "@/types/types";
import { create } from "zustand";
import {persist} from "zustand/middleware";

const INITIAL_STATE = {
  products: [],
  totalItem: 0,
  totalPrice: 0,
};
export const useCartStore = create(persist<CartType & ActionsType>(( set, get ) => ({
  products: INITIAL_STATE.products,
  totalItems: INITIAL_STATE.totalItem,
  totalPrice: INITIAL_STATE.totalPrice,
  
  addToCart(item) {
    const products = get().products
    const productInState = products.find(product => product.id === item.id)
    if (productInState) {
      const updatedProducts = products.map( (product)=>product.id === productInState.id ? {
        ...item,
        quantity: item.quantity + productInState.quantity,
        price:item.price +productInState.price
      } : item)
      set((state)=>({
        products: updatedProducts,
        totalItems: state.totalItems + item.quantity,
        totalPrice: state.totalPrice + item.price,
      }))
    }
else
   { set((state) => ({
      products: [...state.products, item],
      totalItems: state.totalItems + item.quantity,
      totalPrice: state.totalPrice + item.price,
    }));}
  },
  removeFromCart(item) {
    set((state) => ({
      products: state.products.filter((product) => product.id !== item.id),
      totalItems: state.totalItems - item.quantity,
      totalPrice: state.totalPrice - item.price,
    }));
  },
}) ,{name:"cart",skipHydration:true}));
