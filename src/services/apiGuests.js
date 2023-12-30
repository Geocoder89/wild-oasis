import supabase from "./supabase"


export const getGuests = async ()=>{
  const {data,error} = await supabase.from('guests').select('*')

  if(error) {
    console.error(error)
    throw new Error('Guests could not be loaded')
  }

  return data
}