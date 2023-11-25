import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  const navigation = useNavigate();
  const navigationHandler = (link) => {
    navigation(link);
  };

  return (
    <>
    <Navbar title="CodeHub" />
      <Container>
 <Typography variant="h1" color="error">404 ERROR!</Typography>
 <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est sunt magnam numquam iusto blanditiis eum laudantium, culpa repellat commodi, voluptates doloremque? Blanditiis alias officia dolores, omnis temporibus voluptatibus reprehenderit quibusdam.</Typography>       
      <Button variant="contained" onClick={() => navigationHandler("/")}>
        Back to Homepage
      </Button>
      </Container>
    </>
  );
}

export default Home;
