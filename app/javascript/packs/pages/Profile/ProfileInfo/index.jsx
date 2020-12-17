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
    <Card style={{ width: '18rem' }} id="card-profile">
      <Card.Img id="img-circle" variant="top" src={Logo} />
      <Card.Body id="card-body">
        <Card.Title>
        {userData.username && userData.first_name && userData.last_name ? <p>{userData.first_name} {userData.last_name}</p> : userData.email}
        </Card.Title>
        <Card.Text id="description">
        {userData.username && userData.first_name && userData.last_name ?
          <p>({userData.username})</p>
          : <p>Complétez vos informations de profil !</p>}
        <p>{userData.description ? userData.description : `Pas de description`}</p>
        </Card.Text>
      </Card.Body>
      <Button id="card-button" variant="outline-dark" onClick={showModal}>
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
