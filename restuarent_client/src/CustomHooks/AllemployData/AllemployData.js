import { useQuery } from "@tanstack/react-query";
import useUrl from "../URL/UseUrl";

const AllemployData = () => {
  const [url] = useUrl();
 
  const { data: employee = [], isLoading, refetch } = useQuery({
    queryKey: ['employee'],
    queryFn: async () => {
      const res = await fetch(`${url}/employee`);
      return res.json();
    }
  });
 

  return { employee, isLoading, refetch };
};

export default AllemployData;
