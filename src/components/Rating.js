import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

export default function BasicRating({ reviewsCount, rating }) {
  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <Rating name="read-only" value={rating} readOnly />
      {reviewsCount && <Typography>{reviewsCount}+ Reivews</Typography>}
    </Box>
  );
}
