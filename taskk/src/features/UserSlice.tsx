import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface UserData {
  cif: string;
  fullname?: string;
}
export interface RezervationData {
  cif: string;
  date: string;
  note: string;
  startTime: string;
  endTime: string;
  fullname?: string;
  roomName?: string;
}

interface DataState {
  data: {
    meetingData: RezervationData[];
    pufikData: RezervationData[];
  };
  users: UserData[];
}
const initialState: DataState = {
  data: {
    meetingData: loadJsonData("meetingData"),
    pufikData: loadJsonData("pufikData"),
  },
  users: [
    { cif: "268", fullname: "Nərmin Qapçıyeva Fəxrəddin qızı" },
    { cif: "198", fullname: "Nəzrin Qocayeva Azad qızı" },
    { cif: "765", fullname: "Həmidə  Xəlilova Şaiq qızı" },
    { cif: "941", fullname: "Səidə Bağırova Rəhman qızı" },
    { cif: "693", fullname: "Aysu Qurbanlı Anar qızı" },
    { cif: "726", fullname: "Əsra Qayıbova Anar qızı" },
  ],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addMeetingData: (state, action: PayloadAction<RezervationData>) => {
      const cif = action.payload.cif;
      if (cif !== undefined) {
        const user = findUserByCif(cif, state.users);
        if (user) {
          action.payload.fullname = user.fullname;
          state.data.meetingData.push(action.payload);
        } else {
          console.error(`User with CIF ${cif} not found.`);
        }
        localStorage.setItem(
          "meetingData",
          JSON.stringify(state.data.meetingData)
        );
      } else {
        console.error("CIF is undefined.");
      }
      console.log(action);
    },
    addPufikData: (state, action: PayloadAction<RezervationData>) => {
      const cif = action.payload.cif;
      if (cif) {
        const user = findUserByCif(cif, state.users);
        if (user) {
          action.payload.fullname = user.fullname;
          state.data.pufikData.push(action.payload);
        } else {
          console.error(`User with CIF ${cif} not found.`);
        }
        localStorage.setItem("pufikData", JSON.stringify(state.data.pufikData));
      } else {
        console.error("CIF is undefined.");
      }
    },
  },
});

export const findUserByCif = (
  cif: string,
  users: UserData[]
): UserData | undefined => {
  return users.find((user) => user.cif === cif);
};

function loadJsonData(key: string): RezervationData[] {
  const jsonData = localStorage.getItem(key);
  return jsonData ? JSON.parse(jsonData) : [];
}

export const { addMeetingData, addPufikData } = userSlice.actions;
export const selectData = (state: RootState) => state.user.data;
export const selectUsers=(state:{user:DataState})=>state.user.users
export default userSlice.reducer;
