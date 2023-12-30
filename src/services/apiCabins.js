import supabase, { supabaseUrl } from "./supabase"

export const getCabins = async()=>{
  const {data,error} = await supabase.from('cabins').select('*')

  if(error) {
    console.error(error)
    throw new Error('Cabins could not be loaded')
  }

  return data
}

export const deleteCabin = async(id)=> {
  const {data,error} = await supabase.from('cabins').delete().eq('id',id)  

  if(error) {
    console.error(error)
    throw new Error('Cabins could not be deleted')
  }

  return data
}

export const createEditCabin = async(newCabin,id)=> {

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl)
  
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );


const imagePath =  hasImagePath ? newCabin.image :`${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
  // https://lckaahzyblehagnchovg.supabase.co/storage/v1/object/public/cabins

// 1. Create/edit a cabin
  let query = supabase.from('cabins')


if(!id) {
  query = query.insert([{...newCabin,image: imagePath}])
  
}

if(id) {
  query = query.update({...newCabin,image: imagePath})
  .eq('id', id)
  .select()
}


const { data, error } = await query.select().single()




if(error) {
  console.error(error)
  throw new Error('Cabins could not be created')
}

if(hasImagePath) {
  return data;
}

const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);


  // 3. Delete the cabin IF there was an error uplaoding image
  if (storageError) {
    await supabase.from("cabin-images").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }





// 3 . return the data
return data
}