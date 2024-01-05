import { useQuery } from "@tanstack/react-query";
import MenuData from "./MenuData/MenuData";
import { useState, useEffect } from "react";
import Loader from "../Componets/Loader";

const useCartData = () => {
  const { menu, isLoading: isMenuLoading } = MenuData();
  const [item, setItem] = useState([]); // Initialize item as an empty array
  const { data: cartData, isLoading: isCartItem } = useQuery({
    queryKey: ['cartData'],
    queryFn: async () => {
    
      const getSavedData = localStorage.getItem('shopping-cart');
      const cartItem = JSON.parse(getSavedData);
      if(!cartItem) return <Loader/>

      const updatedItems = [];

      for (const key in cartItem) {
        const targetItem = menu.find(data => data.id == key);

        if (targetItem) {
          const updatedItem = { ...targetItem, quantity: cartItem[key] };
          updatedItems.push(updatedItem);
        }
      }

      setItem(updatedItems);

      if(updatedItems)return updatedItems;
    },
  });



  return [cartData, isCartItem];
};

export default useCartData;
