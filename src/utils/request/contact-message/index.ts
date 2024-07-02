import { PaginationDataType, PostContactMessageType } from "@/utils/types/request";


export const getContactMessageRequest = async (pagination: PaginationDataType) => {
    try {
        const token = localStorage.getItem("token")
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };
        const raw = await fetch("http://vetner360.koyeb.app/web/api/contact-message/list", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(pagination)
        })

        const response = await raw.json()
        return response
    } catch (error) {
        return { message: `error: ${error}` }
    }
}


export const postContactMessageRequest = async (newContactMessage: PostContactMessageType) => {
    try {
        const token = localStorage.getItem("token")
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };
        const raw = await fetch("http://vetner360.koyeb.app/web/api/contact-message/", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(newContactMessage)
        })

        const response = await raw.json()
        return response
    } catch (error) {
        return { message: `error: ${error}` }
    }
}


export const patchContactMessageRequest = async (updatedContactMessage: PostContactMessageType, id: string) => {
    try {
        const token = localStorage.getItem("token")
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };
        const raw = await fetch(`http://vetner360.koyeb.app/web/api/contact-message/${id}`, {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify(updatedContactMessage)
        })

        const response = await raw.json()
        return response
    } catch (error) {
        return { message: `error: ${error}` }
    }
}

export const deleteContactMessageRequest = async (id: string) => {
    try {
        const token = localStorage.getItem("token")
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };
        const raw = await fetch(`http://vetner360.koyeb.app/web/api/contact-message/${id}`, {
            method: "DELETE",
            headers: headers
        })

        const response = await raw.json()
        return response
    } catch (error) {
        return { message: `error: ${error}` }
    }
}