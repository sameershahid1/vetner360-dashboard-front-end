import { PaginationDataType, PostUserType } from "@/utils/types/request";

export const getUser = async (pagination: PaginationDataType, userType: string) => {
    try {
        const token = localStorage.getItem("token")
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };
        const raw = await fetch(`http://vetner360.koyeb.app/web/api/user/list?userType=${userType}`, {
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


export const postUser = async (newUser: PostUserType) => {
    try {
        const token = localStorage.getItem("token")
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };
        const raw = await fetch("http://vetner360.koyeb.app/web/api/user/", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(newUser)
        })

        const response = await raw.json()
        return response
    } catch (error) {
        return { message: `error: ${error}` }
    }
}


export const patchUser = async (updatedUser: PostUserType, id: string) => {
    try {
        const token = localStorage.getItem("token")
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };
        const raw = await fetch(`http://vetner360.koyeb.app/web/api/user/${id}`, {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify(updatedUser)
        })

        const response = await raw.json()
        return response
    } catch (error) {
        return { message: `error: ${error}` }
    }
}

export const deleteUser = async (id: string) => {
    try {
        const token = localStorage.getItem("token")
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };
        const raw = await fetch(`http://vetner360.koyeb.app/web/api/user/${id}`, {
            method: "DELETE",
            headers: headers
        })

        const response = await raw.json()
        return response
    } catch (error) {
        return { message: `error: ${error}` }
    }
}