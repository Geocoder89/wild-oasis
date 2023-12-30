import { useQuery } from "@tanstack/react-query";
import { getGuests } from "../../services/apiGuests";


export const useGetGuests = ()=> {
  const {isLoading, data: guests } = useQuery({
    queryKey: ['guests'],
    queryFn: getGuests
    
  })

  return {isLoading, guests}
}