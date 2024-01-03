import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";


function EndTimeSelect ()  {
const {control}= useFormContext() 
  return(
  <Box style={{marginLeft:"-8px"}}>
    <Controller
    control={control}
    name="endTime"
    render={({
      field: { ref,value, onChange, ...fields },
      fieldState: { error },
    }) => (
      <FormControl sx={{ m: 1, minWidth: 310 }}>
        <InputLabel>Son saat</InputLabel>
        <Select style={{ width: "440px" }}
          label="endTime"
          value={value ?? ""}
          error={error && true}
          onChange={onChange}
          {...fields}
        >
          <MenuItem value="09:00">09:00</MenuItem>
          <MenuItem value="09:15">09:15</MenuItem>
          <MenuItem value="09:30">09:30</MenuItem>
          <MenuItem value="09:45">09:45</MenuItem>
          <MenuItem value="10:00">10:00</MenuItem>
          <MenuItem value="10:15">10:15</MenuItem>
          <MenuItem value="10:30">10:30</MenuItem>
        </Select>
        {error && <FormHelperText style={{color:"red"}}>{error.message}</FormHelperText>}
      </FormControl>
    )}
  />
  </Box>
  )
    };
export default EndTimeSelect;
