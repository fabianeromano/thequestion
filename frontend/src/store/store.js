const { configureStore, combineReducers } = require("@reduxjs/toolkit");
import authReducer from "@/features/auth/authSlice";
import regReducer from "@/features/reg/regSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

const persistConfig = {
  timeout: 1000,
  key: "root",
  storage: storage,
  blacklist: []
};

export const rootReducers = combineReducers({
  auth: authReducer,
  reg: regReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});
