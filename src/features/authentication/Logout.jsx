import ButtonIcon from '../../ui/ButtonIcon'
import {HiArrowRightOnRectangle} from 'react-icons/hi2'
import { useLogout } from './useLogout'
import SpinnerMini from '../../ui/SpinnerMini'
 const Logout = () => {
  const {logout, isLogOut} = useLogout()

  const handleLogout = ()=> {
    logout()
  }
   return (
     <ButtonIcon onClick={handleLogout} disabled={isLogOut}>
     {!isLogOut ? < HiArrowRightOnRectangle/> : <SpinnerMini/>}
     </ButtonIcon>
   )
 }
 
 export default Logout