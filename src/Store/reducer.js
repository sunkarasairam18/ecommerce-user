import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "data",
    initialState: {
       categories: [],
       token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjA1MTdkMDM3N2U1YzVhYzQxZjk1MWUiLCJlbWFpbCI6InZhbXNpQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY0NDU3NDI3MH0.NzXQDVOt3lvdo__7h53QDCq0YQ_lFNe9zIpHr8LhS20",
       products: [],
       page: {},
       user: {
            _id:"",
            userName: "",
            email: "",
            role: "",
            token: localStorage.getItem("token")?localStorage.getItem("token"):""
        },
        toast: {
            msg: "",
            show: false,
            severity: ""
        },
        cart :[],
        cartCount: 0,
        showSignIn: false,
        showSignUp: false
    },
    reducers: {
        signInUser: (user,actin)=>{ //If user signs in server sends user data,this reducers sets user data
            user.user = actin.payload;
        },
        setToken: (user,action)=>{
            user.user.token = action.payload.token;
        },
        setUser: (user,action)=>{  //If user token already in local storage this reducer gets and sets user data
            user.user = {
                ...action.payload,
                token: user.user.token
            }
        },     
        setCategories: (user,action)=>{
            user.categories = action.payload;
        },
        setProducts: (user,action)=>{
            user.products = action.payload;
        },
        setCart: (user,action)=>{
            user.cart = action.payload;
        },  
        setCartCount: (user,action)=>{
            user.cartCount = action.payload;
        },
        updateCart: (user,action)=>{
            user.cart.forEach((item,index)=>{
                if(item._id === action.payload.id){
                    user.cart[index].quantity += action.payload.qty; 
                    return;
                }
            }); 
        },
        delCartItem: (user,action)=>{
            let newcart = user.cart.filter(function(item){
                return item._id !== action.payload.id;
            });
            user.cart = newcart;
        },
        setPage: (user,action)=>{
            user.page = action.payload.page;
        },
        setToast : (user,action)=>{
            user.toast = {
                msg: action.payload.msg,
                show: true,
                severity: action.payload.severity
            }
        },
        closeToast : (user,actin)=>{
            user.toast.show = false; 
        },
        setShowSignIn : (user,action)=>{
            user.showSignIn = action.payload;
        },
        setShowSignUp : (user,action) =>{
            user.showSignUp = action.payload;
        },
        logOut: (user,action) =>{
            localStorage.clear();
            user.user = {
                _id:"",
                userName:"",
                email:"",
                role:"",
                token:""
            }
        }
    }
});



export const {setCategories,setProducts,setCart,setCartCount,updateCart,delCartItem,setPage,signInUser,setToken,setUser,setToast,closeToast,setShowSignIn,setShowSignUp,logOut} = slice.actions;
export default slice.reducer;