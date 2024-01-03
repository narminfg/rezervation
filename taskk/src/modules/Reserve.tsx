import { useForm, Controller, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, TextField } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDispatch, useSelector } from "react-redux";
import  {addMeetingData,addPufikData,selectUsers,} from "../features/UserSlice";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import StartTimeSelect from "../components/startTimeSelect";
import EndTimeSelect from "../components/endTimeSelect";
interface FormValues {
  id: number;
  cif: string;
  date: string;
  note: string;
  startTime: string;
  endTime: string;
}

const schema = yup
  .object({
    cif: yup.string()
    .required("Cif qeyd edilməyib")
    .test('cif',"Cif 3 rəqəmli olmalidir",function(value:any){
      return value.length === 3;
    }),
    date: yup
      .string()
      .required("Tarix qeyd edilməyib")
      .test("date", "Kecmis tarix secile bilmez", function (val:any) {
        console.log("nnnn",val);
        let res;
       if (val.includes("-")) {
        const parts=val.split("-");
        const selectedDate = new Date(`${parts[2]}-${parts[1]}-${Number(parts[0])+1}`)
        const currentDate = new Date(new Date().setHours(0,0,0,0));
         res= currentDate>selectedDate;
       }
       else {
        res = new Date() >val
       }
        return !res;
      }),
    note: yup.string().required("Not qeyd edilməyib"),
    startTime: yup.string().required("Başlama saatı qeyd edilməyib"),
    endTime: yup
      .string()
      .required("Bitmə saatı qeyd edilməyib")
      .test(
        "is-after-start",
        "Bitmə saatı, başlama saatının ardından gəlməlidir",
        function (endTime, { parent }) {
          const startTime = parent.startTime;
          return startTime && endTime && startTime < endTime;
        }
      ),
  })
  .required();


const Reserve = () => {
  const location = useLocation();
  const { roomName } = useParams();
  const navigate = useNavigate();
  const users=useSelector(selectUsers);

  const handleClose = () => {
    if (location.pathname === "/reserve/meeting") {
      navigate("/meeting");
    } else {
      navigate("/pufik");
    }
  };
  const methods = useForm({
    mode:"all",
    resolver: yupResolver(schema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    reset,
  } = methods;
  console.log(errors);
  // console.log(getValues());


  const dispatch = useDispatch(); 

  const onSubmit = handleSubmit(async (data: Omit<FormValues, "id">) => {
  
    const cifExists = users.find(user => user.cif === data.cif);
    if (cifExists) {
    if (roomName === "meeting") {
      dispatch(addMeetingData(data));
      navigate("/meeting");
    } else {
      dispatch(addPufikData(data));
      navigate("/pufik");
    }
    reset();
    
  }else {
    alert("Bu cifdə adam yoxdur");}

  });

  const handleDateChanged = (val:any) => {
    const date= new Date(val);
    const month = date.getUTCMonth()+ 1; 
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
    const formattedDate: any = day + "-" + month + "-" + year;
    setValue("date", formattedDate);
  };
  
  return (
    
    <FormProvider {...methods}>
      <Box>
          <ClearIcon onClick={handleClose} style={{ cursor: "pointer",marginLeft:"90%" }} />
        </Box>
        
     <Box sx={{display:"flex",marginTop:"-36px"}}>
     <Box
        marginLeft={"50px"}
        component="img"
        alt="Bank Respublika"
        src="https://img.freepik.com/premium-vector/man-character-thinking_155707-268.jpg"
      />
     <form
        style={{
          marginLeft: "150px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          marginTop:"61px"
        }}
        onSubmit={onSubmit}
      >
        <Box>
          <Controller
            control={control}
            name="cif"
            render={({
              field: { value, ...fields },
              fieldState: { error },
            }) => (
              <TextField
                style={{ width: "440px" }}
                label="Cif"
                {...fields}
                value={value ?? ""}
                error={error && true}
                helperText={error && error.message}
              />
            )}
          />
        </Box>
        <Box>
          <Controller
            control={control}
            name="note"
            render={({
              field: { value, ...fields },
              fieldState: { error },
            }) => (
              <TextField
                style={{ width: "440px" }}
                sx={{
                  marginTop:2
                }}
                label="Note"
                {...fields}
                value={value ?? ""}
                error={error && true}
                helperText={error && error.message}
              />
            )}
          />
        </Box>
        <StartTimeSelect />
        <EndTimeSelect />
        <Box style={{ width: "440px" }}>
          <Controller
            control={control}
            name="date"
            render={({
              field: { onChange, onBlur, value, ...fields },
              fieldState: { error },
            }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker 
                   sx={{
                    width:440
                  }}
                    onChange={(date:any) => {
                      onChange(date);
                      handleDateChanged(date);
                    }}
                    format="DD-MM-YYYY"
                    slotProps={{
                      textField: {
                        error: !!error,
                        helperText: error?.message,
                      },
                    }}
                    {...fields}
                  />
                </DemoContainer>
              </LocalizationProvider>
            )}
          />
        </Box>
        <Box>
          <button
          style={{marginTop: "15px",
          border: "2px solid #1565C0",
          borderRadius: "5px",
          padding: "12px",
          backgroundColor: "#1565C0",
          width:"150px",
          cursor: "pointer",
          fontSize:"16px",
          color:"white"
        }}
        >
          Yadda saxla
        </button>
        </Box>
      </form>
      
     </Box>
    </FormProvider>
  );
  
};
export default Reserve;
