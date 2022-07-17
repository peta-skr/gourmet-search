//お店の詳細ページ
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Paper from "@mui/material/Paper";
import InfoTableRow from "../components/infoTableRow/InfoTableRow";
import Header from "../components/header/Header";
import ShopDetailSkeleton from "../components/shopDetailSkeleton/ShopDetailSkeleton";

//テーブルに入れるデータを作成する関数
function createData(name, value) {
  return { name, value };
}

const ShopDetail = React.memo(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [shop, setShop] = useState("");
  const [rows, setRows] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    if (!shop) {
      getShop();
    }
  }, []);

  //店Idを使ってデータを取得する。
  //そのあと、テーブルに使うrowsにcreateData関数を使って入れる。
  //最後にロードをfalseにする
  const getShop = async () => {
    const result = await axios.get("http://localhost:5000/shop", {
      params: {
        id: searchParams.get("shopId"),
      },
    });
    setShop(result.data.results.shop[0]);
    setRows([
      createData("最寄り駅", result.data.results.shop[0].station_name),
      createData("ディナー予算", result.data.results.shop[0].budget.average),
      createData("料金備考", result.data.results.shop[0].budget.budget_memo),
      createData("総席数", result.data.results.shop[0].capacity),
      createData("店舗URL", result.data.results.shop[0].urls.pc),
      createData("営業時間", result.data.results.shop[0].open),
      createData("定休日", result.data.results.shop[0].close),
      createData(
        "最大宴会収容人数",
        result.data.results.shop[0].party_capacity
      ),
    ]);
    setLoad(false);
  };

  //ロード中はこれが表示される。
  if (load) {
    return (
      <>
        <Header displayBack={true} />
        <ShopDetailSkeleton />
      </>
    );
  }

  return (
    <>
      <Header displayBack={true} />
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Container maxW="800px">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4">{shop.name}</Typography>
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: 2 }}>
              <Typography variant="subtitle">{shop.catch}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <img src={shop.photo.pc.l} alt="shopImage" />
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="body1" sx={{ marginY: 3 }}>
                アクセス:{shop.access}
              </Typography>
              <Typography variant="body1" sx={{ marginY: 3 }}>
                住所：{shop.address}
              </Typography>
              <Typography variant="body1" sx={{ marginY: 3 }}>
                ジャンル：{shop.genre.name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">情報</Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableBody>
                    {rows.map((row) => (
                      <InfoTableRow
                        name={row.name}
                        value={row.value}
                        key={row.name}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Container>
      </motion.div>
    </>
  );
});

export default ShopDetail;
