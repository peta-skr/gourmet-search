//テーブルのrow部分

import React from "react";
import { styled } from "@mui/material/styles";
import { TableCell, TableRow } from "@mui/material";

//奇数行の背景色を変更して、一番下のボーダーを消している。
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const InfoTableRow = ({ name, value }) => {
  return (
    <StyledTableRow>
      <TableCell component="th" scope="row">
        {name}
      </TableCell>
      <TableCell>{value}</TableCell>
    </StyledTableRow>
  );
};

export default InfoTableRow;
