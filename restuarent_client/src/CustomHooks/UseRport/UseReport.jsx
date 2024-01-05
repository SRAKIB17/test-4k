import { useQuery } from "@tanstack/react-query";
import useUrl from "../URL/UseUrl";


const UseReport = () => {
  const [url] = useUrl();
 

  const { data: report = [], isLoading: isReportLoading } = useQuery({
    queryKey: ['report'],
    queryFn: async () => {
      const res = await fetch(`${url}/today-report`);
      return res.json();
    }
  });


  return { report,isReportLoading };
};

export default UseReport;
