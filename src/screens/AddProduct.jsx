import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { Await, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import {
  ref as storageRef,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { auth, storage, database } from "../config/Firebase/FirebaseConfig";

function AddProduct() {
  const [image, setImage] = useState("");
  const [productData, setProductData] = useState({});
  const [isLoading, seIsLoading] = useState(true);

  useEffect(() => {
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

  const InputDataHandler = (e) => {
    // console.log(e.target.value);
    setProductData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const imageHandler = async (e) => {
    const IMAGE_URL = URL.createObjectURL(e.target.files[0]);
    setImage(IMAGE_URL);

    const STORAGE_REF = storageRef(storage, "images/image1.jpg");
    const upload = await uploadBytes(STORAGE_REF, IMAGE_URL);
    const imageURL = await getDownloadURL(upload.ref);
    console.log(imageURL);

    setProductData((prev) => ({
      ...prev,
      image: IMAGE_URL,
    }));
  };

  console.log(productData);

  return (
    <>
      <Navbar />
      <Container>
        <Stack>
          <Stack sx={{ mt: 1, mb: 1 }}>
            <Typography variant="h3">Add Product</Typography>
          </Stack>
          <Stack sx={{ mt: 1, mb: 1, maxWidth: 500 }}>
            <TextField id="title" onChange={InputDataHandler} label="Title" />
          </Stack>
          <Stack sx={{ mt: 1, mb: 1, maxWidth: 500 }}>
            <TextField
              id="description"
              onChange={InputDataHandler}
              multiline
              rows={4}
              label="Description"
            />
          </Stack>
          <Stack sx={{ mt: 1, mb: 1, maxWidth: 500 }}>
            <TextField
              id="price"
              onChange={InputDataHandler}
              type="number"
              label="Price"
            />
          </Stack>
          <Stack sx={{ mt: 1, mb: 1, maxWidth: 500 }}>
            <TextField type="file" onChange={imageHandler} />
          </Stack>
          <Stack sx={{ mt: 1, mb: 1, maxWidth: 500 }}>
            <Button variant="contained">Add</Button>
          </Stack>
          {image && (
            <Stack sx={{ mt: 1, mb: 1 }}>
              <Typography variant="h4">Image Preview:</Typography>
              <img src={image} width="300" />
            </Stack>
          )}
        </Stack>
      </Container>
    </>
  );
}

export default AddProduct;
