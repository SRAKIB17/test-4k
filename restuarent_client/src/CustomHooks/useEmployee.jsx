import { useContext } from "react";
import useUrl from "./URL/UseUrl"
import { AuthContext } from "../providers/AuthoProvider";
import { useQuery } from "@tanstack/react-query";

const useEmployee=()=>{
      const [url]=useUrl();
      const {user,loading}=useContext(AuthContext);
      if(loading){
            return <h2>asdas</h2>
      }

      const {data:isEmployee=[], isLoading:isEmployeeLoading}=useQuery({
            queryKey:['admin'],
            queryFn:async()=>{
                  const res= await fetch(`${url}/user/employee/${user?.id}`);
                  return res.json()
            }
      })
      console.log(isEmployee);
      return [isEmployee,isEmployeeLoading]
}

export default useEmployee