//お店検索ページのローディング中に表示しておくスケルトンコンポーネント

import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const ShopResultSkeleton = () => {
  return (
    <Box
      Box
      sx={{
        maxWidth: 800,
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingX: { xs: 1, md: 0 },
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Skeleton variant="rectangular" height={300} />
        </Grid>
        <Grid item xs={12}>
          <Skeleton variant="rectangular" height={300} />
        </Grid>
        <Grid item xs={12}>
          <Skeleton variant="rectangular" height={300} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShopResultSkeleton;
