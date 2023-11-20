 
 import {createSlice } from "@reduxjs/toolkit";
 
 const AuthSlice = createSlice({
    name:'auth',
    initialState:{isLoggedIn:false,emailId:'',tokenId:''},
    reducers:{
        login(state,action){
            state.isLoggedIn=true
            state.emailId = action.payload.emailId
            state.tokenId=action.payload.tokenId
        },
        logout(state){
            state.isLoggedIn=false
            state.emailId = ''
            state.tokenId = ''
        }
    }
})

export const AuthActions = AuthSlice.actions
export default AuthSlice