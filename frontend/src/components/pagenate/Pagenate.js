import React from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@chakra-ui/react";

const Pagenate = ({ setData, page, pageAmount }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  let pageId = Number(page);
  let arr;
  if (pageId == 1) {
    arr = [1, 2, "...", pageAmount - 1, pageAmount];
  } else if (pageId == pageAmount) {
    arr = [1, 2, "...", pageAmount - 1, pageAmount];
  } else if (pageId == 2) {
    arr = [1, 2, 3, "...", pageAmount - 1, pageAmount];
  } else if (pageId == pageAmount - 1) {
    arr = [1, 2, "...", pageAmount - 2, pageAmount - 1, pageAmount];
  } else {
    arr = [
      1,
      2,
      "...",
      pageId - 1,
      pageId,
      pageId + 1,
      "...",
      pageAmount - 1,
      pageAmount,
    ];
  }
  console.log(arr);

  const search = async (item) => {
    const result = await axios.get("http://localhost:5000", {
      params: {
        lat: searchParams.get("lat"),
        lng: searchParams.get("lng"),
        range: searchParams.get("range"),
        page: item,
      },
    });
    console.log(result.data.results.shop);
    setData(result.data.results.shop);
    navigate(
      `/result?lat=${searchParams.get("lat")}&lng=${searchParams.get(
        "lng"
      )}&range=${searchParams.get("range")}&page=${item}`
    );
  };

  return (
    <div>
      {arr.map((item) => {
        if (item === pageId) {
          return (
            <Button mx="1" disabled>
              {item}
            </Button>
          );
        } else if (item === "...") {
          return <span>{item}</span>;
        } else {
          return (
            <Button
              mx="1"
              colorScheme="teal"
              onClick={() => {
                search(item);
              }}
            >
              {item}
            </Button>
          );
        }
      })}
    </div>
  );
};

export default Pagenate;
