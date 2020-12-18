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
        <Card id="card-profile">
          <div className="d-flex justify-content-center">
            <Card.Img id="img-circle" variant="top"  src={userData.avatar} />
          </div>
          <Card.Body id="card-body">
            <Card.Title>
            {userData.username && userData.first_name && userData.last_name ? <p>{userData.first_name} {userData.last_name}</p> : userData.email}
            </Card.Title>
            <Card.Text id="description">
            {userData.username && userData.first_name && userData.last_name ?
              (userData.username)
              : `Complétez vos informations de profil\u00a0!`}
            <span><br/><br/>{userData.description ? userData.description : `Pas de description`}</span>
            </Card.Text>
          </Card.Body>
          <Button id="card-button" variant="outline-dark" onClick={showModal}>
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
