
import useUrl from '../URL/UseUrl';
import { useQuery } from '@tanstack/react-query';

 const OrderData = () => {
  const [url] = useUrl();
  const { data: order = [], isLoading, refetch } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const res = await fetch(`${url}/orders`)
      return res.json()
    }
  })


  return { order, isLoading, refetch};
};

export default OrderData