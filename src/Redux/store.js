import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import noteReducer from "./noteSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    note: noteReducer,
  },
});

export default  store   ;