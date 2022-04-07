import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import app from "./firebase.init";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";

const auth = getAuth(app);

function App() {
  const [validated, setValidated] = useState(false);
  const [register, setRegister] = useState(false);
const[name,setName]=useState('')
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


const handleNameBlur=(event)=>{
  const nameCatch=event.target.value
  console.log(nameCatch);
}

  const handleEmailBlur = (event) => {
    setEmail(event.target.value);
  };

  const handleCheck = (event) => {
    setRegister(event.target.checked);
  };

  const handlePasswordBlur = (event) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = (event) => {
    setError("");
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
      setError("Please valid password");
    }

    setValidated(true);
    setError("");

    if (register) {
      signInWithEmailAndPassword(auth, email, password)
        .then((result) => {
          const user = result.user;
          console.log(user);
        })
        .catch((error) => {
          console.log(error);
          setError(error.message);
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
          const user = result.user;
          console.log(user);
          setEmail("");
          setPassword("");
          verifyEmail();
          setUserName()
        })
        .catch((error) => {
          console.error(error);
          setError(error.message);
        });
    }
    event.preventDefault();
  };


  const setUserName=()=>{
    updateProfile(auth.currentUser,{
      displayName:name
    })
    .then(()=>{
      console.log("user name");
    })
    .catch(error=>{
      setError(error.message)
    })

  }

 const handleForgetPassword=()=>{
   sendPasswordResetEmail(auth,email)
   .then(()=>{
     console.log('email set');
   })
 }
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      console.log("email verfication");
    });
  };

  return (
    <div className="App">
      <div className="userRegistration w-50 mx-auto">
        <h3 className="text-secondary">
          Please {register ? "Login" : "Register"} Baby!!
        </h3>
        <Form
          noValidate
          validated={validated}
          onSubmit={handleFormSubmit}
        >
          {!register && <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Your Name</Form.Label>
            <Form.Control
              onBlur={handleNameBlur}
              type="text"
              placeholder="Enter name"
              required
            />
          
            <Form.Control.Feedback type="invalid">
              Please Enter Your name.
            </Form.Control.Feedback>
          </Form.Group>}
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
              <Form.Check
                onChange={handleCheck}
                type="checkbox"
                label="Already registered?"
              />
            </Form.Group>
          </Form.Group>

          <p className="text-danger">{error?error+"😵😵":"Secuessfull you 😍😍"}</p>
          <Button onClick={handleForgetPassword} variant="link">Forget password</Button>
          <Button className="bg-secondary" type="submit">
            {register ? "Login" : "Regiester"}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
