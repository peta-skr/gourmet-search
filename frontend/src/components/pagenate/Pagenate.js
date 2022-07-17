//ページネーションコンポーネント

import React from "react";
import { Link, useSearchParams } from "react-router-dom";

import Pagination from "@mui/material/Pagination";
import { PaginationItem } from "@mui/material";

const Pagenate = ({ pageAmount }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <Pagination
      count={pageAmount}
      page={Number(searchParams.get("page"))}
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          to={`/result?lat=${searchParams.get("lat")}&lng=${searchParams.get(
            "lng"
          )}&range=${searchParams.get("range")}&page=${item.page}`}
          {...item}
        />
      )}
    />
  );
};

export default Pagenate;
