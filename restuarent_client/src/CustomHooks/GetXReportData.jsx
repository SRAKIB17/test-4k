import { useQuery } from "@tanstack/react-query"
import useUrl from "./URL/UseUrl"

const useXReportData=()=>{
      const [url]= useUrl()
      const {data:xReportData=[], isLoading:isXReportData, refetch}=useQuery({
            queryKey:['xReport'],
            queryFn:async()=>{
                  const res= await fetch(`${url}/report-x`)
                  return res.json();
            }
      })
      return [xReportData, isXReportData,refetch]
}

export default useXReportData