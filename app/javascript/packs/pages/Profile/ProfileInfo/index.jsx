import "./index.scss";
import React, { useEffect, useRef, useState } from "react";
import { Card, Button } from "react-bootstrap";
import authStore from "../../../stores/Auth";
import { observer } from "mobx-react";
import ProfileModal from "./ProfileModal";
import useGetData from "../../../hooks/useGetData";

const ProfileInfo = () => {
  const reloadTick = useRef(0);
  const { user, userID } = authStore;
  const { isLoading, data: userData } = useGetData(`users/${userID}`, reloadTick.current);
  const [isShown, setIsShown] = useState(false);

  const showModal = () => {
    setIsShown(true);
  };

  console.log("USER :" ,user)
  return (
    <>
      {isLoading || !userData ? (
        <p>Loading</p>
      ) : (
        <Card >
          <div className="d-flex justify-content-center">
            <Card.Img variant="top"  src={userData.avatar} />
          </div>
          <Card.Body>
            <Card.Title>
              {userData.first_name} {userData.last_name} ({userData.username})
            </Card.Title>
            <Card.Text>
              {userData.description === "" ? <p>Pas de description</p> : userData.description}
            </Card.Text>
          </Card.Body>
          <Button id="cardButton" onClick={showModal}>
            Modifier le profil
          </Button>
          <ProfileModal
            userID={userID}
            isShown={isShown}
            setIsShown={setIsShown}
            userData={userData}
            onSaved={() => {
              reloadTick.current = reloadTick.current + 1;
            }}
          />
        </Card>
      )}
    </>
  );
};

export default observer(ProfileInfo);
