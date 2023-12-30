import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import NewBookingForm from './newBookingForm'


const AddBooking = ()=> {
  return (
    
    // COMPOUND COMPONENT PATTERN TO BUILD A MODAL
    <div>
    <Modal>
    <Modal.Open opens="booking-form">
      <Button>Add a Booking</Button>
    </Modal.Open>
    <Modal.Window name="booking-form">
    <NewBookingForm/>
    </Modal.Window>  
    </Modal>
    
    </div>
   
  
  )



}

// const AddCabin = () => {
//   const [isOpenModal, setIsOpenModal] = useState(false)
//   return (
//     <div> <Button onClick={()=> setIsOpenModal((show)=> !show)}>Add new cabin</Button>
//     {isOpenModal && <Modal onClose={()=>setIsOpenModal(false)}><CreateCabinForm onCloseModal={()=>setIsOpenModal(false)}/></Modal>}</div>
//   )
// }

export default AddBooking