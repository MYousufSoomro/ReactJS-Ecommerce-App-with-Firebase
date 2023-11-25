import {
  Button,
  CircularProgress,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, database } from "../config/Firebase/FirebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const error = (msg) => toast.error(msg);
const success = (msg) => toast.success(msg);

function Signup() {
  useEffect(() => {
    authValidate();
  }, []);

  const navigation = useNavigate();
  // const navigationHandler = (link) => {
  //   navigation(link);
  // };

  const authValidate = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
        navigation("/home");
      } else {
        console.log("No user logged in");
      }
    });
  };

  const [inputsData, setInputsData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const submitButtonHandler = async () => {
    setIsLoading(true);
    // console.log(inputsData)

    try {
      const resp = await createUserWithEmailAndPassword(
        auth,
        inputsData.email,
        inputsData.password
      );
      console.log(resp.user);
      success("User created...");
      inputsData.uid = resp.user.uid;
      console.log(inputsData);
      const refer = ref(database, `users/${inputsData.uid}`);
      try {
        await set(refer, inputsData);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        error(error);
      }
    } catch (err) {
      console.log(err);
      error(err.message);
      setIsLoading(false);
    }
  };

  const InputDataHandler = (e) => {
    // console.log(e.target.value);
    setInputsData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  return (
    <>
      <Navbar title="CodeHub" />
      <Container>
        <Typography variant="h3" color="success">
          Signup Form!
        </Typography>
        <Stack gap={2} sx={{ m: 2, maxWidth: 400 }}>
          <Stack>
            <TextField
              id="name"
              onChange={InputDataHandler}
              label="Enter your name"
            />
          </Stack>
          <Stack>
            <TextField
              id="email"
              onChange={InputDataHandler}
              type="email"
              label="Enter your email"
            />
          </Stack>
          <Stack>
            <TextField
              id="password"
              onChange={InputDataHandler}
              type="password"
              label="Enter password"
            />
          </Stack>
          <Stack>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <Button variant="contained" onClick={submitButtonHandler}>
                Signup
              </Button>
            )}
          </Stack>
          <Stack>
            <Typography>
              Already have an account?{" "}
              <span
                style={{ cursor: "pointer", color: "blue" }}
                onClick={() => navigation("/signin")}
              >
                Signin here
              </span>
            </Typography>
          </Stack>
        </Stack>
        <ToastContainer
          theme="colored"
          position="bottom-right"
          autoClose={5000}
        />
      </Container>
    </>
  );
}

export default Signup;
