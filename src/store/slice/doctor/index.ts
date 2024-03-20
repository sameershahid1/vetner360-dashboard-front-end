import { PaginationType, DoctorType } from "@/utils/types/table";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface StateType {
    editDoctor: boolean;
    doctor: DoctorType[];
    doctorPagination: PaginationType;
}

const initialState = {
    doctor: [],
    doctorPagination: {
        page: 0,
        totalSize: 0,
        rowsPerPage: 10,
    },
    editDoctor: false,
}

export const DoctorSlice = createSlice({
    name: "Doctor",
    initialState,
    reducers: {
        GetDoctorList: (state: StateType, action) => {
            state.doctor = action.payload.list
            state.doctorPagination = action.payload.newPagination
        },
        DeleteDoctor: (state: StateType, action) => {
            state.doctor = state.doctor.filter((fle) => fle._id !== action.payload)
        },
        isEdit: (state: StateType) => {
            state.editDoctor = !state.editDoctor
        },
        UpdateDoctor: (state: StateType, action: PayloadAction<any>) => {
            state.doctor = state.doctor.map((fle) =>
                fle._id === action.payload.id
                    ? { ...action.payload }
                    : fle,
            );
        },
        addDoctor: (state: StateType, action: PayloadAction<any>) => {
            state.doctor.push(action.payload)
        },
    }
})


export const {
    GetDoctorList,
    UpdateDoctor,
    DeleteDoctor,
    addDoctor,
    isEdit,
} = DoctorSlice.actions

export default DoctorSlice.reducer

