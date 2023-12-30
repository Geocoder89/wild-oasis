import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useGetBooking } from "./useGetBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import useUpdateCheckOut from "../check-in-out/useUpdateCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const {booking, isLoading} = useGetBooking()
  const {checkout, isCheckingOut} = useUpdateCheckOut()
  const {deleteBooking, isDeletingBooking} = useDeleteBooking()
  const navigate = useNavigate()
  const moveBack = useMoveBack();

  const handleCheckIn = ()=>{
    navigate(`/checkin/${bookingId}`)
  }

  const handleCheckOut = ()=> {
    checkout(bookingId)
  }
  

  if (isLoading) return <Spinner/>

  if(!booking) return <Empty resource='booking'/>

  const {status,id:bookingId} = booking 

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking {bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      

      <ButtonGroup>
        
   
        {status === 'unconfirmed' &&<Button onClick={handleCheckIn}>
          Check in
        </Button>}

        {status === 'checked-in' &&<Button disabled={isCheckingOut} onClick={handleCheckOut} >
              Check Out
            </Button>}

            <Modal>
            <Modal.Open opens='delete'>
            <Button variation="danger" disabled={isDeletingBooking}>Delete Booking</Button>
            
            </Modal.Open>
            
            <Modal.Window name='delete'>
            <ConfirmDelete resourceName='booking' onConfirm={()=>{
                deleteBooking(bookingId,{
                  onSettled: ()=> navigate(-1)
                })
            }}/>
            </Modal.Window>
            </Modal>
           

            <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;

// <BookingDataBox booking={booking} />
