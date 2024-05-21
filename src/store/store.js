import { configureStore } from "@reduxjs/toolkit";
import UsersSlice from "./Slice/UsersSlice";
import PropertySlice from "./Slice/PropertySlice";
const store=configureStore({
    reducer:{
        user:UsersSlice,
        property:PropertySlice
    }
})
export default store