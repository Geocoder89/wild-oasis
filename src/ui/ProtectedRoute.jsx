import {useGetUser }from '../features/authentication/useGetUser'
import Spinner from '../ui/Spinner'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react'
const FullPage = styled.div`
height: 100vh;
background-color: var(--color-grey-50);
display: flex;
justify-content: center;
align-items: center;
`
const ProtectedRoute = ({children}) => {

  const navigate = useNavigate()
  // Load the authenticated user

  const {isLoading,isAuthenticated} = useGetUser()


  // if there is NO authenticated user, redirect to the /login ,we cannot use the hook in the top level function so we use a useEffect hook

  useEffect(()=>{
    if(!isAuthenticated && !isLoading) {
      navigate('/login')
    }
      }, [isAuthenticated, isLoading,navigate])
  // while loading show a spinner

  if(isLoading) return (
    <FullPage>
    <Spinner/>  
    </FullPage>
    
    )


  

  // if there is redirect to the needed route.
  if(isAuthenticated) return children
}

export default ProtectedRoute