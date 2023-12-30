import supabase from "./supabase"
import { supabaseUrl } from "./supabase"

export const signup = async({email,password,fullName})=> {
let {data, error} = await supabase.auth.signUp({
  email,
  password,
  options: {
    data: {
      fullName,
      avatar: ''
    }
  }
})

if(error) throw new Error(error.message)

return data
}
export const login = async ({email,password})=>{

let { data, error } = await supabase.auth.signInWithPassword({
  email,
  password
})

if(error) {
  throw new Error(error.message)
}



return data

}


export const getCurrentUser = async ()=> {
  const {data: session} = await supabase.auth.getSession()

  if(!session.session) return null

  const {data, error} = await supabase.auth.getUser()

  console.log(data)

  if(error) throw new Error(error.message)

  return data?.user
}

export const logOut = async ()=>{
  const {error} = await supabase.auth.signOut()
  if(error) throw new Error(error.message)

}

export const updateCurrentUser = async ({password, fullName, avatar})=> {
  // update password or full name

  let updateData

  if(password) updateData = {password}
  if (fullName) updateData = {data: {
    fullName
  }}
  
 const {data, error} = await supabase.auth.updateUser(updateData)

 if(error) throw new Error(error.message)
 if(!avatar) return data

  // upload the avatar image

  const fileName = `avatar-${data.user.id}-${Math.random()}`

  const {error: storageError} = await supabase.storage.from('avatars').upload(fileName,avatar)

  if(storageError) throw new Error(storageError.message)


  // update the avatar in the user.

  const {data: updatedUser, error: finalError} = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`
    }
  })

  if(finalError) throw new Error(finalError.message)

  return updatedUser
}