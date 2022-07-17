//検索結果を表示するページ

import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
//コンポーネント
import Pagenate from "../components/pagenate/Pagenate";
import ShopCard from "../components/shopCard/ShopCard";
import ShopResultSkeleton from "../components/shopResultSkeleton/ShopResultSkeleton";
import Header from "../components/header/Header";

const SearchResult = ({
  data,
  setData,
  available,
  setAvailable,
  load,
  setLoad,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    loadData();
  }, []);

  //サーバー側に投げて、データを受け取る関数。
  const loadData = async () => {
    const result = await axios.get(`http://localhost:5000`, {
      params: {
        lat: searchParams.get("lat"), //パラメーターを取得
        lng: searchParams.get("lng"), //パラメーターを取得
        range: searchParams.get("range"), //パラメーターを取得
        page: searchParams.get("page"), //パラメーターを取得
      },
    });
    console.log(searchParams.get("page"));
    setData(result.data.results.shop);
    setAvailable(result.data.results.results_available);
    setLoad(false);
  };

  const pageAmount = Math.ceil(available / 10); //ページ数を計算

  //ローディング中ならスケルトンを表示する。
  if (load) {
    return (
      <>
        <Header displayBack={false} />
        <ShopResultSkeleton />
      </>
    );
  }

  //受け取ったデータの件数が0の場合はこれを表示する。
  if (available === 0) {
    return (
      <>
        <Header displayBack={false} />
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box>指定した条件では見つかりませんでした。</Box>
          </Box>
        </motion.div>
      </>
    );
  }

  //正常に取得できたらこれを表示する。
  return (
    <>
      <Header displayBack={false} />
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingX: { xs: 1, md: 0 },
          }}
        >
          <Typography variant="h5">{available}件見つかりました</Typography>
          {data.map((item) => (
            <ShopCard item={item} />
          ))}
          <Pagenate pageAmount={pageAmount} />
        </Box>
      </motion.div>
    </>
  );
};
export default SearchResult;
