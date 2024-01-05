
import { useQuery } from "@tanstack/react-query";
import useUrl from "../URL/UseUrl";

const MenuData = () => {
  const [url]=useUrl();
 
  const {data:menu=[], isLoading,refetch}= useQuery({
    queryKey:['menu'],
    queryFn:async()=>{
      const res= await fetch(`${url}/menu`)
      return res.json()
    }
  })
 ; 

  return { menu, isLoading,refetch };
};

export default MenuData
