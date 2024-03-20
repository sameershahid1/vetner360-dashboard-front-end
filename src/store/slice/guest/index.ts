import { PaginationType, GuestType } from "@/utils/types/table";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface StateType {
    editGuest: boolean;
    guest: GuestType[];
    guestPagination: PaginationType;
}

const initialState = {
    guest: [],
    guestPagination: {
        page: 0,
        totalSize: 0,
        rowsPerPage: 10,
    },
    editGuest: false,
}

export const GuestSlice = createSlice({
    name: "Guest",
    initialState,
    reducers: {
        GetGuestList: (state: StateType, action) => {
            state.guest = action.payload.list
            state.guestPagination = action.payload.newPagination
        },
        DeleteGuest: (state: StateType, action) => {
            state.guest = state.guest.filter((fle) => fle._id !== action.payload)
        },
        isEdit: (state: StateType) => {
            state.editGuest = !state.editGuest
        },
        UpdateGuest: (state: StateType, action: PayloadAction<any>) => {
            state.guest = state.guest.map((fle) =>
                fle._id === action.payload.id
                    ? { ...action.payload }
                    : fle,
            );
        },
        addGuest: (state: StateType, action: PayloadAction<any>) => {
            state.guest.push(action.payload)
        },
    }
})


export const {
    GetGuestList,
    UpdateGuest,
    DeleteGuest,
    addGuest,
    isEdit,
} = GuestSlice.actions

export default GuestSlice.reducer

