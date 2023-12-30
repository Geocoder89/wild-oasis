import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createBooking as createBookingApi } from "../../services/apiBookings"
import toast from "react-hot-toast"


export const useCreateBooking = ()=> {

  const queryClient = useQueryClient()

  const {mutate: createBooking, isPending: isCreatingBooking} = useMutation({
    mutationFn: createBookingApi,
    onSuccess: ()=> {
      toast.success('Booking successfully created')
      queryClient.invalidateQueries({
        queryKey: [
          'bookings'
        ]
      })
    },

    onError: (err)=> toast.error(err.message)
  })

  return { createBooking, isCreatingBooking}
}