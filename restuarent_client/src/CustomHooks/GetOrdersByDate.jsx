import { useQuery } from "@tanstack/react-query";
import useUrl from "./URL/UseUrl"

const useOrderByDate = () => {
      const [url] = useUrl();
      const { data: orderByDate = [] } = useQuery({
            queryKey: ['order-date'],
            queryFn: async () => {
                  const res = await fetch(`${url}/most-sold`);
                  return res.json()
            }
      })
      
      return [orderByDate]
}

export default useOrderByDate