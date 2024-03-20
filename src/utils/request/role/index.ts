import { PaginationType } from "@/utils/types/table";


export const getRole = async (pagination: PaginationType) => {
    try {
        // const jsonData = JSON.stringify(pagination);
        // const response = await fetch("/api/role/pagination/", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: jsonData,
        // });

        // if (!response.ok) {
        //     throw new Error(`Role Get API request failed with status ${response.status}`);
        // }
        // const responseData = await response.json();

        // return responseData
        return pagination
    } catch (error: any) {
        console.log(error);
    }
};

export const postRole = async (values: any) => {
    try {
        // const jsonData = JSON.stringify(values);
        // const response = await fetch("/api/role/", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: jsonData,
        // });

        // if (!response.ok) {
        //     throw new Error(`Role Post API request failed with status ${response.status}`);
        // }
        // const responseData = await response.json();

        // return responseData
        return {}
    } catch (error: any) {
        console.log(error);
    }
};


export const deleteRole = async (id: string) => {
    try {
        // const response = await fetch(`/api/role/${id}`, {
        //     method: "Delete",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        // });

        // if (!response.ok) {
        //     throw new Error(`Role Delete API request failed with status ${response.status}`);
        // }
        // const responseData = await response.json();

        // return responseData
        return {}
    } catch (error: any) {
        console.log(error);
    }
};


export const patchRole = async (values: any) => {
    try {
        // const jsonData = JSON.stringify(values);
        // const response = await fetch("/api/role", {
        //     method: "PATCH",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: jsonData,
        // });

        // if (!response.ok) {
        //     throw new Error(`Role Patch API request failed with status ${response.status}`);
        // }

        // const responseData = await response.json();

        // return responseData
        return {}
    } catch (error: any) {
        console.log(error);
    }
};





