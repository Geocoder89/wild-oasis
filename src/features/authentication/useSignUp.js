import { useMutation } from "@tanstack/react-query"
import { signup as signupApi } from "../../services/apiAuth"
import toast from "react-hot-toast"


export const useSignUp = ()=> {
  const {mutate: signup, isPending: isSigningUp} = useMutation({
    mutationFn: signupApi,
    onSuccess: (user)=> {
      console.log(user)

      toast.success(`Account successfully created. please verify the new account from the user's email address`)
    }

  })
  return {signup, isSigningUp}
}