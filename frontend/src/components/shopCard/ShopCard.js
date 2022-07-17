//お店のカードコンポーネント
import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import { Link as RouteLink } from "react-router-dom";

const ShopCard = ({ item }) => {
  return (
    <Card
      sx={{
        display: { md: "flex" },

        maxWidth: { xs: 400, md: 800 },
        maxHeight: { xs: 450, md: 300 },
        my: 2,
      }}
    >
      <CardMedia
        component="img"
        sx={{
          maxWidth: { xs: "100%", md: 300 },
          height: { xs: 200, md: 250 },
          mr: 3,
        }}
        image={item.photo.pc.l}
        alt="shop image"
      />
      <Box>
        <Grid container spacing={{ xs: 0, md: 1 }}>
          <Grid item xs={12}>
            <RouteLink to={"/detail?shopId=" + item.id}>
              <Link>
                <Typography variant="h5">{item.name}</Typography>
              </Link>
            </RouteLink>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              {item.catch}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              {item.access}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Chip label={item.genre.name} color="primary" />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              {item.budget.average ? item.budget.average : "-"}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default ShopCard;
