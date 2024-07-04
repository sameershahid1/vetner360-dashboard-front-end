import { LoginType } from "@/utils/types/request";


export const loginRequest = async (credential: LoginType) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
        };
        const raw = await fetch("https://vetner360.koyeb.app/web/api/login", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(credential)
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


