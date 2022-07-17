import { Container, Typography } from "@mui/material";
import React from "react";
import Header from "../components/header/Header";

const NotFound = () => {
  return (
    <>
      <Header />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">404 - Page Not Found</Typography>
        <Typography variant="body1">このページは存在しません</Typography>
      </Container>
    </>
  );
};

export default NotFound;
