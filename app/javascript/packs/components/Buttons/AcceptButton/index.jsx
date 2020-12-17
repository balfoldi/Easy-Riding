import React, { useEffect, useState } from "react";
import {Button} from "react-bootstrap"
import Cookies from "js-cookie";

const AcceptButton = ({ target, id, callback, message }) => {
  const [warning, setWarning] = useState(true);

  const destroy = () => {
    setWarning(true)
    fetch(`/api/${target}/${id}.accept`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("EasyRiderUserToken")}`,
      }
    }).then(() => callback());
  };

  return (
    <>
      {warning ? (
        <Button onClick={()=>setWarning(false)} variant="success">
          {message ? message : "Partager mes coordonés"}
        </Button>
      ) : (
        <Button onClick={destroy} variant="danger">
          Confirmez ?
        </Button>
      )}
    </>
  );
};

export default AcceptButton