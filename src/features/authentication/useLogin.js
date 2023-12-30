import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { login as loginApi } from "../../services/apiAuth"
import toast from "react-hot-toast"

const useLogin = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
 const {mutate: login, isPending:isLogin} = useMutation({
  mutationFn: ({email,password})=> loginApi({email,password}),

  onSuccess: (user)=> {
    queryClient.setQueryData(['user'],user.user) // manually set the user in the react query cache
    navigate('/dashboard',{replace: true})
  },

  onError: err=> {
    console.log('ERROR', err)
    toast.error('Provided email or password are incorrect')

  }
 })


return {login, isLogin}

}

export default useLogin