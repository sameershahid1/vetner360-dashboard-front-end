import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import CustomizerReducer from "./customizer/CustomizerSlice";
import RoleReducer from "./slice/role";
import PermissionReducer from "./slice/doctor";

export const store = configureStore({
  reducer: {
    customizer: CustomizerReducer,
    roleReducer: RoleReducer,
    permissionReducer: PermissionReducer
  },
  devTools: process.env.NODE_ENV !== "production",
});

const rootReducer = combineReducers({
  customizer: CustomizerReducer,
  roleReducer: RoleReducer,
  permissionReducer: PermissionReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;
