import React, { useContext, useState, useEffect } from "react";
import { Container, Button, Form, Alert, Col } from "react-bootstrap";
// import Cookies from "js-cookie";
// import { StoreContext } from "../../store/index.jsx";
import "./signupform.scss";

const SignupForm = () => {
  // const [input, setInput] = useState({ role: "student" });
  // const [token, setToken] = useState("");
  // const store = useContext(StoreContext);
  // const [errors, setErrors] = useState([]);

  // const fetchUser = () => {
  //   console.log("fetchUser()");
  //   console.log(input);
  //   const data = {
  //     user: {
  //       first_name: input.first_name,
  //       last_name: input.last_name,
  //       email: input.email,
  //       role: input.role,
  //       password: input.password,
  //       password_confirmation: input.password_confirmation,
  //     },
  //   };
  //   fetch("/api/signup", {
  //     method: "post",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(data),
  //   })
  //     .then((response) => {
  //       for (var pair of response.headers.entries()) {
  //         if (pair[0] === "authorization") {
  //           Cookies.set("token", pair[1]);
  //         }
  //       }
  //       return response.json();
  //     })
  //     .then((response) => {
  //       console.log(response);
  //       console.log(Cookies.get("token"));
  //       if (!response.errors) {
  //         //console.log(response.errors)
  //         setErrors([]);
  //         Cookies.set("currentUser", JSON.stringify(response))
  //         store.setCurrentUser(response);
  //       } else {
  //         console.log("setErrors");
  //         setErrors(response.errors);
  //       }
  //       console.log("store is");
  //       console.log(store.currentUser);
  //     });
  // };

  // const clickFetch = () => {
  //   console.log("clickFetch()");
  //   console.log(input);
  //   fetchUser();
  // };

  // const handleInputChange = (event) => {
  //   console.log(input);
  //   setInput({
  //     ...input,
  //     [event.target.name]: event.target.value,
  //   });
  // };

  return (
    <Container id="form-container">
      {/* {errors.map((error) => (
        <Alert variant="warning">{error.detail}</Alert>
      ))} */}
      <p id="intro">Bienvenue à bord !</p>
      <Form>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Identifiant</Form.Label>
          <Form.Control
            //onChange={handleInputChange}
            name="first_name"
            type="text"
            placeholder="Choisissez votre identifiant (ex : riderdelextremedu57...)"
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Prénom</Form.Label>
          <Form.Control
            //onChange={handleInputChange}
            name="first_name"
            type="text"
            placeholder="Entrez votre prénom"
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Nom de famille</Form.Label>
          <Form.Control
            //onChange={handleInputChange}
            name="last_name"
            type="text"
            placeholder="Entrez votre nom de famille"
          />
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId="formBasicEmail">
            <Form.Label>Votre adresse email</Form.Label>
            <Form.Control
            //onChange={handleInputChange}
            name="email" type="email" placeholder="Entrez une adresse email valide" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Téléphone</Form.Label>
            <Form.Control
            //onChange={handleInputChange}
            name="phone_number" type="tel" placeholder="Entrez votre numéro de téléphone" />
          </Form.Group>
        </Form.Row>


        <Form.Row>
        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
          //onChange={handleInputChange}
          name="password" type="password" placeholder="Choisissez un mot de passe" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Mot de passe 2</Form.Label>
          <Form.Control
          //onChange={handleInputChange}
          name="password_confirmation" type="password" placeholder="Confirmez votre mot de passe" />
        </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Check type="checkbox"></Form.Check>
          <Form.Label>J'accepte les <a href="#">Conditions Générales d'Utilisation</a></Form.Label>
        </Form.Row>

        <Form.Text className="text-muted">
          Nous ne partagerons jamais vos informations personnelles avec d'autres services.
        </Form.Text>
      </Form>

        <Button id="button"
        //onClick={clickFetch}
        variant="primary" type="submit">
          Inscription
        </Button>
    </Container>
  );
};

export default SignupForm;
