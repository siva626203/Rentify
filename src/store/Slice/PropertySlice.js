import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  name:String,
  place:  String,
  area:  String,
  bedrooms:  Number,
  bathrooms:  Number,
  hospitals:  String,
  colleges:  String,
  price:  Number,
};
const PropertySlice=createSlice({
    name:"Property",
    initialState:initialState,
    reducers:{
        select:(state,action)=>{
          const {name,place,area,bedrooms,bathrooms,hospitals,colleges,price}=action.payload
            state.name=name
            state.place=place
            state.area=area
            state.bathrooms=bathrooms
            state.bedrooms=bedrooms
            state.colleges=colleges
            state.hospitals=hospitals
            state.price=price
        },
        remove:(state)=>{
            state = {
              name: "",
              place: "",
              area: "",
              bedrooms: 0,
              bathrooms: 0,
              hospitals: "",
              colleges: "",
              price: 0,
            };
        }
    }
})
export const {select,remove}=PropertySlice.actions
export default PropertySlice.reducer