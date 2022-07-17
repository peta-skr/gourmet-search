//お店詳細ページのローディング中に表示しておくスケルトンコンポーネント

import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const ShopDetailSkeleton = () => {
  return (
    <Box maxWidth={800} sx={{ marginX: "auto" }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Skeleton variant="text" height={70} />
        </Grid>
        <Grid item xs={12}>
          <Skeleton variant="text" height={50} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Skeleton variant="rectangular" height={200} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Skeleton variant="rectangular" height={200} />
        </Grid>
        <Grid item xs={12}>
          <Skeleton variant="rectangular" height={400} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShopDetailSkeleton;
