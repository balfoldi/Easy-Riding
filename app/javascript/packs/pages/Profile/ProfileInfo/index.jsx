import "./index.scss";
import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
//import authStore from "../../../stores/Auth";
import { observer } from "mobx-react";
import Cookies from "js-cookie";
import ProfileModal from "./ProfileModal";
import jwt_decode from "jwt-decode";
import Logo from "./default_avatar.png";

const ProfileInfo = () => {
  const userToken = Cookies.get("EasyRidingUserToken");
  const [userData, setUserData] = useState({});
  const [show, setShow] = useState(false);
  //const { user } = authStore;
  const user = { id: '' };
  user.id = jwt_decode(userToken).sub;

  const showModal = () => {
    setShow(true);
  }

  const loadProfile = () => {
    fetch(`/api/users/${user.id}`, {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${userToken}`
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    loadProfile();
  }, [])

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={Logo} />
      <Card.Body>
        <Card.Title>{userData.first_name} {userData.last_name} ({userData.username})</Card.Title>
        <Card.Text>
          {userData.description === "" ? <p>Pas de description</p> : userData.description}
        </Card.Text>
      </Card.Body>
      <Button id="cardButton" onClick={showModal}>
        Modifier le profil
      </Button>
      <ProfileModal
        user={user}
        userToken={userToken}
        show={show}
        setShow={setShow}
        showModal={showModal}
        userData={userData}
        setUserData={setUserData}
        loadProfile={loadProfile}
      />
    </Card>
  )
}

export default observer(ProfileInfo);
