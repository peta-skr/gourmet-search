//サーチページ
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import SelectForm from "../components/selectForm/SelectForm";
import Header from "../components/header/Header";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();

  const [latitude, setLatitude] = useState(""); //緯度
  const [longitude, setLongitude] = useState(""); //経度
  const [range, setRange] = useState(""); //範囲
  const [open, setOpen] = useState(false); //アラートを表示するかどうか

  //経度と緯度ジャンルを取得する
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (success) => {
        setLatitude(success.coords.latitude);
        setLongitude(success.coords.longitude);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  //範囲を選択した際の関数
  //範囲をrangeに入れて、openをfalseにすることで、アラートが表示されていれば消すようにする。
  const handleChange = (event) => {
    setRange(event.target.value);
    setOpen(false);
  };

  //サーチボタンが押された際に走る関数
  //距離を指定していない場合はアラートを表示し、指定した場合はSearchResultページへ遷移する。
  const search = async (e) => {
    e.preventDefault();
    if (!range) {
      setOpen(true);
    } else {
      navigate(
        `/result?lat=${latitude}&lng=${longitude}&range=${range}&page=1`
      );
    }
  };

  return (
    <>
      <Header displayBack={false} />
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Box sx={{ maxWidth: 800 }} margin="auto">
          <Grid container h="100%" spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h2" sx={{ textAlign: "center" }}>
                Gourmet Search
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                marginX: { xs: 3, md: 0 },
              }}
            >
              <SelectForm
                range={range}
                handleChange={handleChange}
                search={search}
              />
            </Grid>
            <Grid
              item
              xs
              sx={{
                marginX: { xs: 3, md: 0 },
              }}
            >
              {open && <Alert severity="error">距離を選択してください</Alert>}
              <Typography>
                このサイトはホットペッパーapiを使用して現在地点からの半径を指定してその半径以内にあるお店を表示するサイトです
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </motion.div>
    </>
  );
};

export default Home;
