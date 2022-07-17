import React from "react";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

const SelectForm = ({ range, handleChange, search }) => {
  return (
    <>
      <FormControl required fullWidth size="small">
        <InputLabel id="select">距離(半径)</InputLabel>
        <Select
          name="range"
          labelId="select"
          label="distance"
          value={range}
          onChange={handleChange}
        >
          <MenuItem value={1}>300m</MenuItem>
          <MenuItem value={2}>500m</MenuItem>
          <MenuItem value={3}>1000m</MenuItem>
          <MenuItem value={4}>2000m</MenuItem>
          <MenuItem value={5}>3000m</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" type="submit" onClick={(e) => search(e)}>
        Search
      </Button>
    </>
  );
};

export default SelectForm;
