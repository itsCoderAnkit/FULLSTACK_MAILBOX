import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import MailSlice from "./MailSlice";
const store = configureStore({
    reducer:{auth:AuthSlice.reducer,mail:MailSlice.reducer}
})

export default store