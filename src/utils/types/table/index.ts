export type CellType = {
    id: number;
    name: string;
};

export type PaginationType = {
    page: number;
    totalSize: number;
    rowsPerPage: number;
}

export type PermissionType = {
    id?: string;
    name: string;
    path: string;
    description: string;
    status?: boolean;
    created_at?: string;
    companyId?: string;
}

export type RoleType = {
    id?: string;
    name: string;
    description: string;
    token?: string,
    created_at?: string;
    status?: boolean;
}


export type UserType = {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNo: string;
    token?: string,
    status?: boolean;
    created_at?: string;
}


export type ActivityType = {
    id?: string;
    name: string;
    note: string;
    startTime: string;
    endTime: string;
    token?: string,
    status?: string;
    created_at?: string;
}

export type PetType = {
    id?: string;
    name: string;
    type: string;
    breed: string;
    activity?: string[],
    token?: string,
    created_at?: string;
    status?: boolean;
}

export type DoctorType = {
    id?: string;
    firstName: string;
    lastName: string;
    phoneNo: string,
    email: string;
    fatherName: string;
    registration: string;
    clinicName: string,
    location: {
        type: string,
        coordinates: Number[],
    },
    experience: string,
    bio: string,
    password: string;
    accountStatus: string;
    token?: string,
    roleId?: string,
    created_at?: string;
    status?: boolean;
}

export type ContactMessageType = {
    id?: string;
    email: string;
    message: string;
    token?: string,
    created_at?: string;
    status?: boolean;
}


