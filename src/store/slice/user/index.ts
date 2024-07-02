import { PaginationType, UserType } from "@/utils/types/table";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface StateType {
    editUser: boolean;
    users: UserType[];
    pagination: PaginationType;
}

const initialState = {
    users: [],
    pagination: {
        page: 0,
        totalSize: 0,
        rowsPerPage: 10,
    },
    editUser: false,
}

export const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        GetUserList: (state: StateType, action) => {
            state.users = action.payload.list
            state.pagination = action.payload.newPagination
        },
        DeleteUser: (state: StateType, action) => {
            state.users = state.users.filter((fle) => fle.token !== action.payload)
        },
        isEdit: (state: StateType) => {
            state.editUser = !state.editUser
        },
        UpdateUser: (state: StateType, action: PayloadAction<any>) => {
            state.users = state.users.map((fle) =>
                fle.token === action.payload.id
                    ? { ...action.payload }
                    : fle,
            );
        },
        addUser: (state: StateType, action: PayloadAction<any>) => {
            state.users.push(action.payload)
        },
    }
})


export const {
    GetUserList,
    UpdateUser,
    DeleteUser,
    addUser,
    isEdit,
} = UserSlice.actions

export default UserSlice.reducer

