 
 import {createSlice } from "@reduxjs/toolkit";
 
 const MailSlice = createSlice({
    name:'mail',
    initialState:{sender:"",subject:"",content:""},
    reducers:{
        view(state,action){
            state.sender=action.payload.sender
            state.subject = action.payload.subject
            state.content=action.payload.content
        },
        close(state){
            state.sender=""
            state.subject = ""
            state.content=""
        }
    }
})

export const MailActions = MailSlice.actions
export default MailSlice