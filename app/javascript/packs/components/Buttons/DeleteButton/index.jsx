import React, { useEffect, useState } from "react";
import {Button} from "react-bootstrap"
import Cookies from "js-cookie";

const DeleteButton = ({ target, id, callback, message }) => {
  const [warning, setWarning] = useState(true);

  const destroy = () => {
    setWarning(true)
    fetch(`/api/${target}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("EasyRiderUserToken")}`,
      }
    }).then(() => callback());
  };

  return (
    <>
      {warning ? (
        <Button onClick={()=>setWarning(false)} variant="warning">
          {message ? message : "Effacer"}
        </Button>
      ) : (
        <Button onClick={destroy} variant="danger">
          Confirmez ?
        </Button>
      )}
    </>
  );
};

export default DeleteButton