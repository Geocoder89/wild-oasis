import Button from "../../ui/Button";
import useUpdateCheckOut from "./useUpdateCheckout";

function CheckoutButton({ bookingId }) {
  const {checkout, isCheckingOut} = useUpdateCheckOut()
  return (
    <Button variation="primary" size="small" onClick={()=>checkout(bookingId)} disabled={isCheckingOut}>
      Check out
    </Button>
  );
}

export default CheckoutButton;
