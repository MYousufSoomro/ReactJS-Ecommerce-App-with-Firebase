import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import Rating from "../components/Rating";
import { useParams } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./prductDetails.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/Firebase/FirebaseConfig";
import { useNavigate } from "react-router-dom";

function ProductDetails() {
  const [item, setItem] = useState([]);
  const [isLoading, seIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    getDataFromAPI();
    authValidate();
  }, []);

  const navigation = useNavigate();

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

  const getDataFromAPI = async () => {
    try {
      const resp = await axios.get(`https://dummyjson.com/products/${id}`);
      setItem(resp.data);
      seIsLoading(false);
      //   console.log(resp.data.products);
    } catch (error) {
      console.log(error);
    }

    // console.log(item);
  };

  const responsiveSettings = [
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ];

  return (
    <>
      <Navbar />
      <Container>
        <Typography variant="h3" sx={{ m: 3 }}>
          {isLoading ? (
            "Wait a while... "
          ) : (
            <Container>
              <Typography variant="h2">{item.title}</Typography>
              <Box sx={{ textAlign: "center" }}>
                {item.images.length > 1 ? (
                  <Slide
                    slidesToScroll={2}
                    slidesToShow={2}
                    indicators={true}
                    responsive={responsiveSettings}
                  >
                    {item.images.map((image, i) => {
                      return (
                        <div className="each-slide-effect">
                          <div
                            style={{ backgroundImage: `url(${image})` }}
                          ></div>
                        </div>
                      );
                    })}
                  </Slide>
                ) : (
                  <img
                    style={{
                      borderRadius: "8px",
                    }}
                    src={item.thumbnail}
                    alt={item.title}
                    width="75%"
                    height="auto"
                  />
                )}
              </Box>
              <Rating rating={item.rating} />
              <Typography>Category: {item.category.toUpperCase()}</Typography>
              <Typography>Brand: {item.brand}</Typography>
              <Typography>Description: {item.description}</Typography>
              <Typography variant="h4">Price: ${item.price}</Typography>
              <Typography>
                upto {item.discountPercentage}% discount available...
              </Typography>
              <Button variant="contained" color="success">
                Buy Now
              </Button>
            </Container>
          )}
        </Typography>

        {isLoading && (
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress />
          </Box>
        )}
      </Container>
    </>
  );
}

export default ProductDetails;
