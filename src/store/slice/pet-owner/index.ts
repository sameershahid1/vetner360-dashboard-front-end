import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PaginationType, PetOwnerType } from "@/utils/types/table";


interface StateType {
    editPetOwner: boolean;
    petOwner: PetOwnerType[];
    petOwnerPagination: PaginationType;
}

const initialState = {
    petOwner: [],
    petOwnerPagination: {
        page: 0,
        totalSize: 0,
        rowsPerPage: 10,
    },
    editPetOwner: false,
}

export const PetOwnerSlice = createSlice({
    name: "PetOwner",
    initialState,
    reducers: {
        GetPetOwnerList: (state: StateType, action) => {
            state.petOwner = action.payload.list
            state.petOwnerPagination = action.payload.newPagination
        },
        DeletePetOwner: (state: StateType, action) => {
            state.petOwner = state.petOwner.filter((owner) => owner._id !== action.payload)
        },
        isEdit: (state: StateType) => {
            state.editPetOwner = !state.editPetOwner
        },
        UpdatePetOwner: (state: StateType, action: PayloadAction<any>) => {
            state.petOwner = state.petOwner.map((owner) =>
                owner._id === action.payload.id
                    ? { ...action.payload }
                    : owner,
            );
        },
        addPetOwner: (state: StateType, action: PayloadAction<any>) => {
            state.petOwner.push(action.payload)
        },
    }
})


export const {
    GetPetOwnerList,
    UpdatePetOwner,
    DeletePetOwner,
    addPetOwner,
    isEdit,
} = PetOwnerSlice.actions

export default PetOwnerSlice.reducer

