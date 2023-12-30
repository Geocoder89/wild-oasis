
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import CabinTable from '../features/cabins/CabinTable';

import AddCabin from '../features/cabins/AddCabin';
import CabinTableOperations from '../features/cabins/CabinTableOperations';

function Cabins() {

  

  // useEffect(() => {
  //   const getAllCabins = async () => {
  //     const data = await getCabins();

  //     const cabins = data;

  //     console.log(cabins, 'this is the cabins');
  //   };

  //   getAllCabins();
  // }, []);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations/>
      </Row>

      <Row>
        <CabinTable />

        <AddCabin/>
      </Row>
    </>
  );
}

export default Cabins;
