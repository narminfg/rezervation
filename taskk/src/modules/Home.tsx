import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <Box display="flex" justifyContent="center">
      <Box
        marginLeft={"50px"}
        component="img"
        alt="Bank Respublika"
        src="https://img.freepik.com/premium-vector/man-character-thinking_155707-268.jpg"
      />
      <Box
        marginLeft={"15%"}
        marginTop={"5%"}
        display="flex"
        flexDirection="column"
      >
        <Typography fontSize={"70px"} fontWeight={"bold"} fontStyle={"oblique"}>
          Otaq seçiminizi edin
        </Typography>
        <Link to="meeting">
          <Button
            style={{
              marginTop: "12px",
              width: "38%",
              height: "80%",
              padding: "20px",
              marginLeft: "30%",
              border: "2px solid white",
              boxShadow: "2px 2px 5px #888888",
              fontSize: "20px",
              fontWeight: "bold",
              color: "#626060",
            }}
            variant="outlined"
          >
            meeting
          </Button>
        </Link>

        <Link to="pufik">
          <Button
            style={{
              marginTop: "12px",
              width: "38%",
              height: "80%",
              padding: "20px",
              marginLeft: "30%",
              border: "2px solid white",
              boxShadow: "2px 2px 5px #888888",
              fontSize: "20px",
              fontWeight: "bold",
              color: "#626060",
            }}
            variant="outlined"
            >
            Pufik
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Home;
