import { PaginationType } from "@/utils/types/table";

export const getPermission = async (pagination: PaginationType) => {
    try {
        const jsonData = JSON.stringify(pagination)
        // const response = await fetch("/api/permission/pagination",{
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: jsonData,
        // });

        // if (!response.ok) {
        //     throw new Error(`API request failed with status ${response.status}`);
        // }
        // const responseData = await response.json();

        return pagination
    } catch (error: any) {
        console.log(error);
    }
};

export const postPermission = async (values: any) => {
    try {
        // const jsonData = JSON.stringify(values);
        // const response = await fetch("/api/permission/", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: jsonData,
        // });

        // if (!response.ok) {
        //     throw new Error(`API request failed with status ${response.status}`);
        // }
        // const responseData = await response.json();

        // return responseData
        return {}
    } catch (error: any) {
        console.log(error);
    }
};


export const deletePermission = async (id: string) => {
    try {
        // const response = await fetch(`/api/permission/${id}`, {
        //     method: "Delete",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        // });

        // if (!response.ok) {
        //     throw new Error(`API request failed with status ${response.status}`);
        // }
        // const responseData = await response.json();

        // return responseData
        return {}
    } catch (error: any) {
        console.log(error);
    }
};


export const patchPermission = async (values: any) => {
    try {
        // const jsonData = JSON.stringify(values);
        // const response = await fetch("/api/permission", {
        //     method: "PATCH",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: jsonData,
        // });

        // if (!response.ok) {
        //     throw new Error(`API request failed with status ${response.status}`);
        // }

        // const responseData = await response.json();

        // return responseData
        return {}
    } catch (error: any) {
        console.log(error);
    }
};





