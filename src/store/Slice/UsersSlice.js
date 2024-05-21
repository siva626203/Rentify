import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  _id:String,
  email: String,
  firstname: String,
  lastname: String,
  phonenumber: String,
  type: String,
};
const UserSlice = createSlice({
  name: "User",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      const {_id,email,firstname,lastname,phonenumber,type}=action.payload
       state._id = _id;
      state.email = email;
      state.firstname = firstname;
      state.lastname = lastname;
      state.phonenumber = phonenumber;
      state.type = type;
    },
    logout: (state) => {
      
        state.email= "";
        state.firstname= "";
        state.lastname= "";
        state.phonenumber= "";
        state.type= "";
        state._id="";
      
    },
  },
});
export const { login, logout } = UserSlice.actions;
export default UserSlice.reducer;
