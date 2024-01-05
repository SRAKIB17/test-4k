import { useQuery } from "@tanstack/react-query"
import useUrl from "./URL/UseUrl"

const useZReportHistory=()=>{
      const [url]= useUrl()
      const {data:ZReportHistory=[], isLoading:isZReportHistory, refetch:zRefetch}=useQuery({
            queryKey:['history'],
            queryFn:async()=>{
                  const res= await fetch(`${url}/zHistory`)
                  return res.json();
            }
      })
   
      return [ZReportHistory, isZReportHistory,zRefetch]
}

export default useZReportHistory