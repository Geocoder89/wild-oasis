import { useMutation, useQueryClient } from "@tanstack/react-query"
import { logOut } from "../../services/apiAuth"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export const useLogout = ()=>{

  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const {mutate: logout, isPending: isLogOut} = useMutation({
    mutationFn: ()=> logOut(),

    onSuccess: ()=> {
      toast.success('User successfully logged out')
      queryClient.removeQueries()
      navigate('/login', {replace: true})
    },

    onError: err=>{
      toast.error('Error logging out')
    }
  })

  return {logout, isLogOut}
}