import { useQuery } from "@tanstack/react-query"
import useUrl from "./URL/UseUrl"

const userTodayAttendance=()=>{
      const [url]= useUrl()
      const {data:todayAttendance=[], isLoading:isTodayAttendance, refetch}=useQuery({
            queryKey:['todayAttendance'],
            queryFn:async()=>{
                  const res= await fetch(`${url}/today-attendance`)
                  return res.json();
            }
      })
      return [todayAttendance, isTodayAttendance,refetch]
}

export default userTodayAttendance