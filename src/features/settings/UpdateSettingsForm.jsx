import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useGetSettings } from './useGetSetting';
import { useUpdateSetting } from './useUpdateSetting';
function UpdateSettingsForm() {
  const {isLoading, settings: {
    minimumBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice
  } = {} } = useGetSettings()

  const {isUpdating, updateSetting} = useUpdateSetting()

  if(isLoading) return <Spinner/>

  const handleUpdate = (e,field)=> {
    const {value} = e.target

    if(!value) return
    updateSetting({
      [field]: value
    })
  }
  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input disabled={isUpdating} type='number' id='min-nights' defaultValue={minimumBookingLength} onBlur={e=> handleUpdate(e,'minimumBookingLength')} />
      </FormRow>

      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights' defaultValue={maxBookingLength} onBlur={e=> handleUpdate(e,'maxBookingLength')} />
      </FormRow>

      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='max-guests' defaultValue={maxGuestsPerBooking} onBlur={e=> handleUpdate(e,'maxGuestsPerBooking')} />
      </FormRow>

      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price' defaultValue={breakfastPrice} onBlur={e=> handleUpdate(e,'breakfastPrice')} />
      </FormRow>

    </Form>
  );
}

export default UpdateSettingsForm;
