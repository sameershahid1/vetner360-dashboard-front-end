import { PaginationDataType, PostRoleType, } from "@/utils/types/request";

export const getRole = async (pagination: PaginationDataType) => {
    try {
        const token = localStorage.getItem("token")
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };
        const raw = await fetch("https://vetner360.koyeb.app/web/api/role/list", {
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


export const postRole = async (newRole: PostRoleType) => {
    try {
        const token = localStorage.getItem("token")
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };
        const raw = await fetch("https://vetner360.koyeb.app/web/api/role/", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(newRole)
        })


        const response = await raw.json()
        return response
    } catch (error) {
        return { message: `error: ${error}` }
    }
}


export const patchRole = async (updatedRole: PostRoleType, id: string) => {
    try {
        const token = localStorage.getItem("token")
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };
        const raw = await fetch(`https://vetner360.koyeb.app/web/api/role/${id}`, {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify(updatedRole)
        })

        const response = await raw.json()
        return response
    } catch (error) {
        return { message: `error: ${error}` }
    }
}

export const deleteRole = async (id: string) => {
    try {
        const token = localStorage.getItem("token")
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };
        const raw = await fetch(`https://vetner360.koyeb.app/web/api/role/${id}`, {
            method: "DELETE",
            headers: headers
        })

        const response = await raw.json()
        return response
    } catch (error) {
        return { message: `error: ${error}` }
    }
}