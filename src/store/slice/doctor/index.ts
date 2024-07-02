import { PaginationType, DoctorType } from "@/utils/types/table";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface StateType {
    editDoctor: boolean;
    doctors: DoctorType[];
    pagination: PaginationType;
}

const initialState = {
    doctors: [],
    pagination: {
        page: 0,
        totalSize: 0,
        rowsPerPage: 10,
    },
    editDoctor: false,
}

export const DoctorSlice = createSlice({
    name: "doctor",
    initialState,
    reducers: {
        GetDoctorList: (state: StateType, action) => {
            state.doctors = action.payload.list
            state.pagination = action.payload.newPagination
        },
        DeleteDoctor: (state: StateType, action) => {
            state.doctors = state.doctors.filter((doctor) => doctor.token !== action.payload)
        },
        isEdit: (state: StateType) => {
            state.editDoctor = !state.editDoctor
        },
        UpdateDoctor: (state: StateType, action: PayloadAction<any>) => {
            state.doctors = state.doctors.map((doctor) =>
                doctor.token === action.payload.id
                    ? { ...action.payload }
                    : doctor,
            );
        },
        addDoctor: (state: StateType, action: PayloadAction<any>) => {
            state.doctors.push(action.payload)
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

