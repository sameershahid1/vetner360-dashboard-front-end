import { PaginationType, PermissionType } from "@/utils/types/table";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface StateType {
    editPermission: boolean;
    permission: PermissionType[];
    permissionPagination: PaginationType;
}

const initialState = {
    permission: [],
    permissionPagination: {
        page: 0,
        totalSize: 0,
        rowsPerPage: 10,
    },
    editPermission: false,
}

export const PermissionSlice = createSlice({
    name: "Permission",
    initialState,
    reducers: {
        GetPermissionList: (state: StateType, action) => {
            state.permission = action.payload.list
            state.permissionPagination = action.payload.newPagination
        },
        DeletePermission: (state: StateType, action) => {
            state.permission = state.permission.filter((fle) => fle.id !== action.payload)
        },
        isEdit: (state: StateType) => {
            state.editPermission = !state.editPermission
        },
        UpdatePermission: (state: StateType, action: PayloadAction<any>) => {
            state.permission = state.permission.map((fle) =>
                fle.id === action.payload.id
                    ? { ...action.payload }
                    : fle,
            );
        },
        addPermission: (state: StateType, action: PayloadAction<any>) => {
            state.permission.push(action.payload)
        },
    }
})


export const {
    GetPermissionList,
    UpdatePermission,
    DeletePermission,
    addPermission,
    isEdit,
} = PermissionSlice.actions

export default PermissionSlice.reducer

