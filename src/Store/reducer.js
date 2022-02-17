import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "data",
    initialState: {
       categories: [],
       token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjA1MTdkMDM3N2U1YzVhYzQxZjk1MWUiLCJlbWFpbCI6InZhbXNpQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY0NDU3NDI3MH0.NzXQDVOt3lvdo__7h53QDCq0YQ_lFNe9zIpHr8LhS20",
       products: []
    },
    reducers: {        
       setCategories: (user,action)=>{
           user.categories = action.payload;
       },
       setProducts: (user,action)=>{
           user.products = action.payload;
       }
    }
});



export const {setCategories,setProducts} = slice.actions;
export default slice.reducer;