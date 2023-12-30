import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";

import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import { useGetCabins } from "../cabins/useGetCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;





const DashboardLayout = () => {
  const {isLoading, bookings} = useRecentBookings()
  const {confirmedStays, isLoading: isLoadingStays,numDays} = useRecentStays()

  const {cabins, isLoading: isLoadingCabins} = useGetCabins()

  if(isLoading || isLoadingStays || isLoadingCabins) return <Spinner/>
  

  console.log(bookings)
  console.log(confirmedStays)
  return (
    <StyledDashboardLayout>
<Stats bookings={bookings} confirmedStays={confirmedStays} numDays={numDays} cabinCount={cabins.length}/>
    <TodayActivity/>
    <DurationChart confirmedStays={confirmedStays}/>
    <SalesChart bookings={bookings} numDays={numDays}/>
    </StyledDashboardLayout>
  )
}

export default DashboardLayout