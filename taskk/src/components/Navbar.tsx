import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Box>
      <Link to="/" style={{ textDecoration: 'none' }}>
      <Typography color={"blue"} fontSize={"39px"} marginLeft={"50px"}>
        Bank <br/> Respublika
      </Typography>
      
      </Link>
    </Box>
  );
};

export default Navbar;
