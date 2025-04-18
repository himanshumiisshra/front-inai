import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import authReducer from "./authSlice";
import noteReducer from "./noteSlice";


const persistConfig = {
  key: "root",
  storage,
};


const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedNoteReducer = persistReducer(persistConfig, noteReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    note: persistedNoteReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

const persistor = persistStore(store);

export { store, persistor };
