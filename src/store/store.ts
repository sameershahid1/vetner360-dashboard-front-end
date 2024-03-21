import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import CustomizerReducer from "./customizer/CustomizerSlice";
import RoleReducer from "./slice/role";
import DoctorReducer from "./slice/doctor";
import GuestReducer from "./slice/guest";
import PermissionReducer from "./slice/permission";
import PetReducer from "./slice/pet";
import PetOwnerReducer from "./slice/pet-owner";
import ContactMessageReducer from "./slice/contact-message";


export const store = configureStore({
  reducer: {
    customizer: CustomizerReducer,
    roleReducer: RoleReducer,
    permissionReducer: PermissionReducer,
    guestReducer: GuestReducer,
    doctorReducer: DoctorReducer,
    petReducer: PetReducer,
    petOwnerReducer: PetOwnerReducer,
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
  petOwnerReducer: PetOwnerReducer,
  contactMessageReducer: ContactMessageReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;
