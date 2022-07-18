const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(cors());

const URL = `http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${process.env.API_KEY}&format=json`;

//緯度と経度、半径で検索する
app.get("/", async (req, res) => {
  //受け取ったpageから検索の開始位置を計算
  let start;
  if (req.query.page) {
    start = (req.query.page - 1) * 10 + 1;
  } else {
    start = 1;
  }

  try {
    const result = await axios.get(
      `${URL}&lat=${req.query.lat}&lng=${req.query.lng}&range=${req.query.range}&start=${start}`
    );
    res.send(result.data);
  } catch (error) {
    console.log(error);
  }
});

//店idで検索する
app.get("/shop", async (req, res) => {
  const result = await axios.get(`${URL}&id=${req.query.id}`);
  res.send(result.data);
});

app.listen("5000", () => {
  console.log("connection");
});
