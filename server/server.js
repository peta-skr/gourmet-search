const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

app.use(cors());

const API_KEY = "f797738da86be242";

const URL =
  "http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=" +
  API_KEY +
  "&format=json";

app.get("/", async (req, res) => {
  console.log(req.query.page);
  let start;
  if (req.query.page) {
    start = (req.query.page - 1) * 10 + 1;
  } else {
    start = 1;
  }
  try {
    console.log(
      URL +
        `&lat=${req.query.lat}&lng=${req.query.lng}&range=${req.query.range}&start=${start}`
    );
    const result = await axios.get(
      URL +
        `&lat=${req.query.lat}&lng=${req.query.lng}&range=${req.query.range}&start=${start}`
    );
    console.log(result.data);
    res.send(result.data);
  } catch (error) {
    console.log(error);
  }
});

app.get("/shop", async (req, res) => {
  console.log(req.query);
  const result = await axios.get(
    "http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=" +
      API_KEY +
      "&format=json&id=" +
      req.query.id
  );
  // console.log(result);
  res.send(result.data);
});

app.listen("5000", () => {
  console.log("connection");
});

// const api = async () => {
//   try {
//     const res = await axios.get(URL);
//     console.log(res.data);
//   } catch (error) {
//     console.log(error);
//   }
// };

// api();
