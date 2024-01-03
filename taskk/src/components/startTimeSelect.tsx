import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Controller,useFormContext } from "react-hook-form";

function StartTimeSelect  ()  {
const{ control,getValues}= useFormContext();
console.log(getValues());
  return(
  <Box style={{marginLeft:"-8px"}}>
    <Controller
    control={control}
    name="startTime"
    render={({
      field: { ref,value, onChange, ...fields },
      fieldState: { error },
    }) => (
      <FormControl sx={{ m:1,marginTop:2, minWidth: 310 }}>
        <InputLabel>Baslangic saat</InputLabel>
        <Select style={{ width: "440px"}}
          label="Baslangic saat"
          error={!!error}
          onChange={onChange}
          {...fields}
          value={value ?? ""}
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
    
export default StartTimeSelect;
