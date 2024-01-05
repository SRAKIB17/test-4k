import { useContext } from "react";
import useUrl from "./URL/UseUrl"
import { AuthContext } from "../providers/AuthoProvider";
import { useQuery } from "@tanstack/react-query";

const useAdmin=()=>{
      const [url]=useUrl();
      const {user,loading}=useContext(AuthContext);
      
      if(loading){
            return <h2>asdas</h2>
      }

      const {data:isAdmin=[], isLoading:isAdminLoading}=useQuery({
            queryKey:['admin'],
            queryFn:async()=>{
                 if(user?.role=='manager'){
                  return true
                 }else return false
            }
      })
      
      return [isAdmin,isAdminLoading]
}

export default useAdmin