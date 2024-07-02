import { PaginationDataType, PostDoctorType } from "@/utils/types/request";

export const getDoctor = async (pagination: PaginationDataType) => {
    try {
        const token = localStorage.getItem("token")
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };
        const raw = await fetch("http://vetner360.koyeb.app/web/api/doctor/list", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(pagination)
        })

        if (!raw.ok) {
            throw new Error('Failed to fetch data')
        }

        const response = await raw.json()
        return response
    } catch (error) {
        return { message: `error: ${error}` }
    }
}


export const postDoctor = async (newDoctor: PostDoctorType) => {
    try {
        const token = localStorage.getItem("token")
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };
        const raw = await fetch("http://vetner360.koyeb.app/web/api/doctor/", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(newDoctor)
        })

        if (!raw.ok) {
            throw new Error('Failed to post data')
        }

        const response = await raw.json()
        return response
    } catch (error) {
        return { message: `error: ${error}` }
    }
}


export const patchDoctor = async (updatedDoctor: PostDoctorType, id: string) => {
    try {
        const token = localStorage.getItem("token")
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };
        const raw = await fetch(`http://vetner360.koyeb.app/web/api/doctor/${id}`, {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify(updatedDoctor)
        })

        if (!raw.ok) {
            throw new Error('Failed to patch data')
        }

        const response = await raw.json()
        return response
    } catch (error) {
        return { message: `error: ${error}` }
    }
}

export const deleteDoctor = async (id: string) => {
    try {
        const token = localStorage.getItem("token")
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };
        const raw = await fetch(`http://vetner360.koyeb.app/web/api/doctor/${id}`, {
            method: "DELETE",
            headers: headers
        })

        if (!raw.ok) {
            throw new Error('Failed to delete data')
        }

        const response = await raw.json()
        return response
    } catch (error) {
        return { message: `error: ${error}` }
    }
}