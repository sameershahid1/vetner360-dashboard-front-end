export type LoginType = {
    email: string;
    password: string;
}

export type LoginResponseType = {
    message: string;
    token?: string;
    userId?: string;
    roleType?: string;
}

export type ResponseType = {
    message: string;
    status: boolean;
    records?: any[];
    data?: any[];
    count?: number;
}


export type PaginationDataType = {
    page: number;
    limit: number;
}

export type PostContactMessageType = {
    email: number;
    message: number;
}

export type PostUserType = {
    firstName: string,
    lastName: string,
    email: string,
    phoneNo: string,
    password: string,
    userType: number,

}

export type PostRoleType = {
    name: string;
    description: string;
}

export type PostDoctorType = {
    firstName: string,
    lastName: string,
    email: string,
    phoneNo: string,
    password: string,
    fatherName: string,
    registration: string,
    clinicName: string,
    longitude: number,
    latitude: number,
    experience: string,
    bio: string,
}


