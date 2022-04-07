import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  createUserWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import app from "./firebase.init";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";

const auth = getAuth(app);

function App() {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailBlur = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordBlur = (event) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = (event) => {
    setError('')
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      
    }
    else if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
      setError("Please valid password");
    }
    
    setValidated(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const user = res.user;
        console.log(user);
        setPassword("");
        setEmail("");
      })
      .catch((error) => {
        console.error(error);
        // setError(error.message);
      });
    // console.log(event.target.value);
    /* console.log("form submit", email, password); */
    event.preventDefault();
  };

  return (
    <div className="App">
      <div className="userRegistration w-50 mx-auto">
        <h3 className="text-secondary">Please Register Baby!!</h3>
        <Form
          noValidate
          validated={validated}
          onSubmit={handleFormSubmit}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onBlur={handleEmailBlur}
              type="email"
              placeholder="Enter email"
              required
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please choose a emaill.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onBlur={handlePasswordBlur}
              type="password"
              placeholder="Password"
              required
            />

            <Form.Control.Feedback type="invalid">
              Please choose a valid password.
            </Form.Control.Feedback>

            <Form.Group
              className="mb-3"
              controlId="formBasicCheckbox"
            >
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
          </Form.Group>

          <p className="text-danger">{error}</p>

          <Button className="bg-secondary" type="submit">
            Register
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
