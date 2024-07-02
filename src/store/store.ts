import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import CustomizerReducer from "./customizer/CustomizerSlice";
import RoleReducer from "./slice/role";
import DoctorReducer from "./slice/doctor";
import GuestReducer from "./slice/user";
import PermissionReducer from "./slice/permission";
import PetReducer from "./slice/pet";
import ContactMessageReducer from "./slice/contact-message";
import UserReducer from "./slice/user";


export const store = configureStore({
  reducer: {
    customizer: CustomizerReducer,
    roleReducer: RoleReducer,
    permissionReducer: PermissionReducer,
    guestReducer: GuestReducer,
    doctorReducer: DoctorReducer,
    petReducer: PetReducer,
    userReducer: UserReducer,
    contactMessageReducer: ContactMessageReducer
  },
  devTools: process.env.NODE_ENV !== "production",
});

const rootReducer = combineReducers({
  customizer: CustomizerReducer,
  roleReducer: RoleReducer,
  permissionReducer: PermissionReducer,
  guestReducer: GuestReducer,
  doctorReducer: DoctorReducer,
  petReducer: PetReducer,
  userReducer: UserReducer,
  contactMessageReducer: ContactMessageReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;
