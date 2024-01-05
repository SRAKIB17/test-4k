import { useQuery } from "@tanstack/react-query";
import useUrl from "./URL/UseUrl"

const useTotalCustomer = () => {
      const [url] = useUrl();
      const { data: totalCustomer = []} = useQuery({
            queryKey: ['category'],
            queryFn: async () => {
                  const res = await fetch(`${url}/total-customer`);
                  return res.json()
            }
      })
      
      return [totalCustomer]
}

export default useTotalCustomer