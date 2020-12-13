import React, { useState } from "react";
import { Button } from "reactstrap";
import BikeFormModal from "./BikeFormModal";

const Garage = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  return (
    <>
      <Button color="danger" onClick={toggle}>
        cc
      </Button>
      <BikeFormModal modal={modal} toggle={toggle} setModal={setModal}/>
    </>
  );
};
export default Garage;
