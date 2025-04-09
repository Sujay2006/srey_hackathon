import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./auth-slice"
import eventReducer from "./event-slice"

const store = configureStore({
    reducer : {
        auth : authReducer,
        event : eventReducer,

    },
});

export default store;