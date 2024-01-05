import { useQuery } from "@tanstack/react-query";
import useUrl from "./URL/UseUrl"

const useMostSoldItem = () => {
      const [url] = useUrl();
      const { data: mostSoldItem = [] } = useQuery({
            queryKey: ['most-sold'],
            queryFn: async () => {
                  const res = await fetch(`${url}/most-sold`);
                  return res.json()
            }
      })
      
      return [mostSoldItem]
}

export default useMostSoldItem