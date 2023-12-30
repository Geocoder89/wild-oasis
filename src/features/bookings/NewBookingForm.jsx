

// core react fns
import { useState } from 'react';
// UI 
import styled from "styled-components";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import Checkbox from '../../ui/Checkbox'
import Button from '../../ui/Button'
import Textarea from '../../ui/Textarea'
import FormRowVertical from '../../ui/FormRowVertical';
// hooks 
import { useGetGuests } from "./useGetGuests";
import {useGetSettings} from '../settings/useGetSetting'
import {useCreateBooking} from './useCreateBooking'
import { useGetCabins } from '../cabins/useGetCabins';
// helper libs
import {useForm} from 'react-hook-form'
import { differenceInDays, isBefore, isDate, startOfToday } from 'date-fns';
import toast from 'react-hot-toast';



const StyledSelect = styled.select`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);
`;

const NewBookingForm = ({onCloseModal}) => {

    const [wantsBreakfast, setWantsBreakfast] = useState(false)
  const [isPaid,setIsPaid] = useState(false)
  const {guests,isLoading} = useGetGuests()
  const { cabins, isLoading: isLoadingCabins} = useGetCabins()
  const {settings,isLoading: isLoadingSettings} = useGetSettings()
  const {createBooking, isCreatingBooking} = useCreateBooking()


  const {register, handleSubmit, getValues,reset,formState:{
    errors
  }} = useForm()

  if(isLoading || isLoadingSettings || isCreatingBooking || isLoadingCabins) return <Spinner/>

  const onSubmitBooking = (data)=> {

    const numNights = differenceInDays(new Date(data.endDate), new Date(data.startDate))

    const today = startOfToday()

    // Filtering of dates

    if(numNights < 1) {
      toast.error(`start date must be before the end date`)
      return;
    }

    if(numNights < settings.minBookingLength) {
      toast.error(`Maximum nights per booking are ${settings.minBookingLength}`)

      return
    }


    if(numNights < settings.maxBooaxgLength) {
      toast.error(`Maximum nights per booking are ${settings.maxBookingLength}`)

      return 
    }

    // check if the date selected is before today

    if(isBefore(new Date(data.startDate),today)) {
      toast.error(`You cannot start a booking before today`)

      return;
    }
    // cabin prices

    const reservedCabin = cabins.filter((cabin)=> cabin.id === Number(data.cabinId)).at(0)

    const cabinPrice = (reservedCabin.regularPrice - reservedCabin.discount) * numNights

    // extrasPrice

    const extrasPrice = wantsBreakfast ? settings.breakfastPrice * numNights * data.numGuests : 0

    // totalPrice 

    const totalPrice = cabinPrice + extrasPrice

    const bookingData = {
      ...data,
      cabinPrice,
      extrasPrice,
      totalPrice,
      isPaid, 
      numNights,
      numGuests: Number(data.numGuests),
      guestId : Number(data.guestId),
      hasBreakfast: wantsBreakfast,
      status: 'unconfirmed',
      startDate: new Date(data.startDate).toISOString(),
      endDate: new Date(data.endDate).toISOString()
    }

    createBooking(bookingData, {
      onSuccess: (data)=> {
        console.log(data)
        reset()
        onCloseModal?.()
      },
      onSettled: ()=>reset()
    })





  }

  const onError = (error)=> {
    console.log(error)
  }
  return (
    <Form onSubmit={handleSubmit(onSubmitBooking,onError)} type={onCloseModal ? 'modal': "regular"}>
    <FormRowVertical label="Start date" error={errors?.startDate?.message}>
    <Input disabled={isCreatingBooking} type='date' id='startDate' {...register('startDate', {
      required: 'This field is required',
      validate: isDate(getValues().startDate || 'You must choose a valid date')
    })}/>
    
    
    </FormRowVertical>

    <FormRowVertical label="End date" error={errors?.endDate?.message}>
    <Input disabled={isCreatingBooking} type='date' id='endDate' {...register('endDate', {
      required: 'This field is required',
      validate: isDate(getValues().endDate || 'You must choose a valid date')
    })}/>
    
    
    </FormRowVertical>



    <FormRowVertical label="Number of Guests" error={errors?.numGuests?.message}>
    <Input disabled={isCreatingBooking} type='number' id='numGuests' min={1} defaultValue={1} {...register('numGuests', {
      required: 'This field is required',
      min: {
        value: 1,
        message: `Minimum number of guests must be 1`
      },

      max: {
        value: settings.maxGuestsPerBooking,
        message:  `Max number of guests must be ${settings.maxGuestsPerBooking}`
      },
      validate: isDate(getValues().startDate || 'You must choose a valid date')
    })}/>
    
    
    </FormRowVertical>
    

    <FormRowVertical label="Select Cabin">
     <StyledSelect disabled={isCreatingBooking} id="cabinId" {...register('cabinId')}>
     
     {cabins.map(cabin=> <option key={cabin.id} value={cabin.id}>{cabin.name}</option>)}
     </StyledSelect>



     
    
    </FormRowVertical>


    <FormRowVertical label="Select Guest">
     <StyledSelect disabled={isCreatingBooking} id="guestId" {...register('guestId')}>
     
     {guests.map(guest=> <option key={guest.id} value={guest.id}>{guest.fullName}</option>)}
     </StyledSelect>
     </FormRowVertical>


     <FormRowVertical>
     <Textarea placeholder="Additional Observations" id='observations' disabled={isCreatingBooking} {...register('observations')}/>
     
     </FormRowVertical>

     <FormRowVertical>
     
     <Checkbox disabled={isCreatingBooking} id="breakfast" onChange={()=>setWantsBreakfast((breakfast)=> !breakfast)}><span>I want breakfast with my booking</span></Checkbox>
     </FormRowVertical>


     <FormRowVertical>
     
     <Checkbox disabled={isCreatingBooking} id="paid" label="paid" onChange={()=>setIsPaid((paid)=> !paid)}>This Booking is paid</Checkbox>
     </FormRowVertical>


     <FormRow>
     
    <Button type='submit' variation="primary" disabled={isCreatingBooking}>Submit</Button>

    <Button variation="secondary" type="reset" onClick={()=>onCloseModal?.()}>
    Cancel
  </Button>
     </FormRow>

     
    
    </Form>
  )
}

export default NewBookingForm





