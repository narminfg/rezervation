import { Box, Button, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectData } from "../features/UserSlice";
import { DataGrid, GridColDef, GridLocaleText } from "@mui/x-data-grid";


const Meeting = () => {
  const data = useSelector(selectData);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClose = () => {
    navigate("/");
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "№", width: 150 },
    { field: "fullname", headerName: "Əlavə edən", width: 350 },
    { field: "date", headerName: "Tarix", width: 230 },
    { field: "startTime", headerName: "Başlama saatı", width: 230 },
    { field: "endTime", headerName: "Bitmə saatı", width: 230 },
    { field: "note", headerName: "Qeyd", width: 230 },
  ];
  

  const rows = data.meetingData.map((row, index) => ({
    
    id: ++index,
    fullname: row.fullname,
    date:row.date,
    startTime: row.startTime,
    endTime: row.endTime,
    note: row.note,
  }));
  console.log(rows);
  return (
    <Box marginLeft={"50px"} marginRight={"50px"} marginTop={"42px"}>
      <Typography
        display={"flex"}
        justifyContent={"center"}
        marginBottom={"45px"}
        fontSize={"35px"}
        color={"#626060"}
        fontWeight={"bold"}
      >
        Meeting room
      </Typography>
      <Box marginLeft={"98%"} marginBottom={"45px"}>
        <ClearIcon onClick={handleClose} style={{ cursor: "pointer" }} />
      </Box>
      <div style={{ minHeight: 200, width: "100%" }}>
        <DataGrid
          componentsProps={{
            pagination: {
              labelRowsPerPage: ('Maksimum sətir sayı')
            }
          }}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
      <Link to={`/reserve${location.pathname}`}>
        <Button
          style={{ marginLeft: "93%", marginTop: "15px" }}
          variant="contained"
        >
          Bron et
        </Button>
      </Link>
    </Box>
  );
};

export default Meeting;
