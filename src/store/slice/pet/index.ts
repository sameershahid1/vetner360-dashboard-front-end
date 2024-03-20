import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PaginationType, PetType } from "@/utils/types/table";


interface StateType {
    editPet: boolean;
    pets: PetType[];
    petPagination: PaginationType;
}

const initialState = {
    pets: [],
    petPagination: {
        page: 0,
        totalSize: 0,
        rowsPerPage: 10,
    },
    editPet: false,
}

export const PetSlice = createSlice({
    name: "Pet",
    initialState,
    reducers: {
        GetPetList: (state: StateType, action) => {
            state.pets = action.payload.list
            state.petPagination = action.payload.newPagination
        },
        DeletePet: (state: StateType, action) => {
            state.pets = state.pets.filter((pet) => pet._id !== action.payload)
        },
        isEdit: (state: StateType) => {
            state.editPet = !state.editPet
        },
        UpdatePet: (state: StateType, action: PayloadAction<any>) => {
            state.pets = state.pets.map((pet) =>
                pet._id === action.payload.id
                    ? { ...action.payload }
                    : pet,
            );
        },
        addPet: (state: StateType, action: PayloadAction<any>) => {
            state.pets.push(action.payload)
        },
    }
})


export const {
    GetPetList,
    UpdatePet,
    DeletePet,
    addPet,
    isEdit,
} = PetSlice.actions

export default PetSlice.reducer

