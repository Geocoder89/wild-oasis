
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";



function CreateCabinForm({cabinToEdit = {},onCloseModal}) {


  const {id: editId, ...editValues} = cabinToEdit
  const isEditSession = Boolean(editId) // if there is an id to edit, if exists, true else false
  const {register, handleSubmit,reset, getValues, formState} = useForm({
    defaultValues: isEditSession ? editValues : {}
  })

  const {errors} = formState

  const {isCreating,createCabin} = useCreateCabin()
  const {isEditing, editCabin} = useEditCabin()
 


    
  const isWorking = isCreating || isEditing
 

  const onSubmit = (data)=>{
    const image = typeof data.image === 'string' ? data.image : data.image[0]
    if(isEditSession) editCabin({newCabinData: {...data, image},id: editId}, {
      onSuccess: (data)=>{
        // console.log(data)
        reset()
        onCloseModal?.()
      }
    })
     
   else  createCabin({...data, image:image},{
    onSuccess: ()=> {
      reset()
      onCloseModal?.()
    }
   })
  }


  const onError = (error)=> {
    console.log(error)
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit,onError)} type={onCloseModal ? 'modal': "regular"}>
      <FormRow label='Cabin Name' error={errors?.name?.message}>
       
        <Input type="text" disabled={isWorking} id="name" {...register('name',{
          required: 'This field is required'
        })} />
      </FormRow>

      <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
        <Input type="number" disabled={isWorking} id="maxCapacity" {...register('maxCapacity',{
          required: 'This field is required',
          min: {
            value: 1,
            message: 'Capacity must be at least 1'
          }
        })} />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        
        <Input type="number" disabled={isWorking} id="regularPrice" {...register('regularPrice',{
          required: 'This field is required'
        })} />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input type="number" disabled={isWorking} id="discount" defaultValue={0}  {...register('discount',{
          required: 'This field is required',
          validate: (value)=> {
            return value <= getValues().regularPrice || 'Discount should be less than the regular price'
          }
        })}/>
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
       
        <Textarea type="number" disabled={isWorking} id="Description for website" defaultValue="" {...register('description',{
          required: 'This field is required'
        })} />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput type="file"  id="image" accept="image/*" {...register('image',{
          required: isEditSession ? false : 'This field is required'
        })}  />
      </FormRow>

      <FormRow>

        <Button variation="secondary" type="reset" onClick={()=>onCloseModal?.()}>
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditSession ? 'Edit Cabin':'Create New Cabin'}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
