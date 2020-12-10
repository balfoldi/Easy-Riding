import React from "react";
import { Container, Button, Form, Alert } from "react-bootstrap";
// import Cookies from "js-cookie";
// import { StoreContext } from "../../store/index.jsx";
import "./loginform.scss";


const LoginForm = () => {
  // const [input, setInput] = useState({role:"student"});
  // const [token, setToken] = useState("");
  // const store = useContext(StoreContext);
  // const [errors, setErrors] = useState([]);

  // const fetchUser = () => {
  //   console.log("fetchUser()");
  //   console.log(input)
  //   const data = {
  //     user: {
  //       email: input.email,
  //       password: input.password,
  //     },
  //   };
  //   fetch("/api/login", {
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
  //         setErrors([]);
  //         store.setCurrentUser(response);
  //         Cookies.set("currentUser", JSON.stringify(response))
  //       } else {
  //         console.log("setErrors");
  //         setErrors(response.errors);
  //       }
  //       console.log("store is")
  //       console.log(store.currentUser)
  //     });
  // };

  // const clickFetch = () => {
  //   console.log("clickFetch()");
  //   console.log(input);
  //   fetchUser();
  // };

  // const handleInputChange = (event) => {
  //   console.log(input)
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
      <p id="intro">Ravis de vous retrouver !</p>
      <Form>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Identifiant</Form.Label>
          <Form.Control
            //onChange={handleInputChange}
            name="username"
            type="username"
            placeholder="Votre pseudonyme"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            //onChange={handleInputChange}
            name="password"
            type="password"
            placeholder="Votre mot de passe"
          />
        </Form.Group>
        </Form>

      <Button //onClick={clickFetch}
      id="button" type="submit">
        Se connecter
      </Button>
    </Container>
  )
}

export default LoginForm;
