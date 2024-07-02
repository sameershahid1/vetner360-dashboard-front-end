import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PaginationType, RoleType } from "@/utils/types/table";


interface StateType {
    editRole: boolean;
    role: RoleType[];
    pagination: PaginationType;
}

const initialState = {
    role: [],
    pagination: {
        page: 0,
        totalSize: 0,
        rowsPerPage: 10,
    },
    editRole: false,
}

export const RoleSlice = createSlice({
    name: "role",
    initialState,
    reducers: {
        GetRoleList: (state: StateType, action) => {
            state.role = action.payload.list
            state.pagination = action.payload.newPagination
        },
        DeleteRole: (state: StateType, action) => {
            state.role = state.role.filter((fle) => fle.token !== action.payload)
        },
        isEdit: (state: StateType) => {
            state.editRole = !state.editRole
        },
        UpdateRole: (state: StateType, action: PayloadAction<any>) => {
            state.role = state.role.map((fle) =>
                fle.token === action.payload.id
                    ? { ...action.payload }
                    : fle,
            );
        },
        addRole: (state: StateType, action: PayloadAction<any>) => {
            state.role.push(action.payload)
        },
    }
})


export const {
    GetRoleList,
    UpdateRole,
    DeleteRole,
    addRole,
    isEdit,
} = RoleSlice.actions

export default RoleSlice.reducer

