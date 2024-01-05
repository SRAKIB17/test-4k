import { useQuery } from "@tanstack/react-query"
import useUrl from "./URL/UseUrl"


const useHour = () => {

      const [url] = useUrl()
      const { data:personalAttendance} = useQuery({
            queryKey: ['personal'],
            queryFn: async () => {
                  const res = await fetch(`${url}/work-hours`);

                  return res.json();

            }

      })
      return [personalAttendance]

}

export default useHour