//ヘッダー

import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Header = ({ displayBack }) => {
  const navigate = useNavigate();
  return (
    <Box sx={{ mb: 5 }}>
      <AppBar position="static">
        <Toolbar>
          {/* 戻るボタンを表示するかどうか（表示するのは詳細ページだけ） */}
          {displayBack && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => navigate(-1)}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
          {/* ホームページに戻る。 */}
          <Button color="inherit" onClick={() => navigate("/")}>
            Home
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
