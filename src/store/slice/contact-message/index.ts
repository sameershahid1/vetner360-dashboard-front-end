import { PaginationType, ContactMessageType } from "@/utils/types/table";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface StateType {
    editContactMessage: boolean;
    contactMessages: ContactMessageType[];
    pagination: PaginationType;
}

const initialState = {
    contactMessages: [],
    pagination: {
        page: 0,
        totalSize: 0,
        rowsPerPage: 10,
    },
    editContactMessage: false,
}

export const ContactMessageSlice = createSlice({
    name: "ContactMessage",
    initialState,
    reducers: {
        GetContactMessageList: (state: StateType, action) => {
            state.contactMessages = action.payload.list
            state.pagination = action.payload.newPagination
        },
        DeleteContactMessage: (state: StateType, action) => {
            state.contactMessages = state.contactMessages.filter((contactMessage) => contactMessage.token !== action.payload)
        },
        isEdit: (state: StateType) => {
            state.editContactMessage = !state.editContactMessage
        },
        UpdateContactMessage: (state: StateType, action: PayloadAction<any>) => {
            state.contactMessages = state.contactMessages.map((contactMessage) =>
                contactMessage.token === action.payload.id
                    ? { ...action.payload }
                    : contactMessage,
            );
        },
        addContactMessage: (state: StateType, action: PayloadAction<any>) => {
            state.contactMessages.push(action.payload)
        },
    }
})


export const {
    GetContactMessageList,
    UpdateContactMessage,
    DeleteContactMessage,
    addContactMessage,
    isEdit,
} = ContactMessageSlice.actions

export default ContactMessageSlice.reducer

