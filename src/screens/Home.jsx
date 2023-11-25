import {
  Box,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/Card/Card";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/Firebase/FirebaseConfig";

function Home() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchItems, setSearchItems] = useState("");

  const [isLoading, seIsLoading] = useState(true);

  useEffect(() => {
    getDataFromAPI();
    authValidate();
  }, []);

  const getDataFromAPI = async () => {
    try {
      const resp = await axios.get("https://dummyjson.com/products/");
      setItems(resp.data.products);
      seIsLoading(false);
      // console.log(resp.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const navigation = useNavigate();
  const onClickHandler = (i) => {
    // alert(i);

    navigation("/product-details/" + i);
  };

  const authValidate = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
      } else {
        navigation("/signin");
      }
    });
  };

  const searchHandler = (text) => {
    const SEARCH_TERM = text.target.value.toLowerCase();
    setSearchTerm(SEARCH_TERM)

    const result = items.filter((word) =>
      word.title.toLowerCase().match(SEARCH_TERM)
    );
    setSearchItems(result);
  };

  return (
    <>
      <Navbar />
      <Container>
        <Container sx={{ m: 5 }}>
          <TextField
            fullWidth
            label="Search here..."
            onChange={searchHandler}
          />
        </Container>
        <Typography variant="h3" sx={{ m: 3 }}>
          {isLoading ? "Wait a while... " : "DummyJSON API Data"}
        </Typography>

        {isLoading && (
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress />
          </Box>
        )}

        {!isLoading && (
          <Container>
            { searchTerm.length< 1 ?  items.map((product, i) => {
              return (
                <Card
                  key={i}
                  image={product.thumbnail}
                  title={product.title.slice(0, 30)}
                  price={product.price}
                  onClick={() => onClickHandler(i + 1)}
                />
              );
            })
           :
           searchItems.map((product, i) => {
              return (
                <Card
                  key={i}
                  image={product.thumbnail}
                  title={product.title.slice(0, 30)}
                  price={product.price}
                  onClick={() => onClickHandler(i + 1)}
                />
              );
            })
            
            }
          </Container>
        )}
      </Container>
    </>
  );
}

export default Home;
