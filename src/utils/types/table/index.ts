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
    _id?: string;
    id?: string;
    name: string;
    path: string;
    description: string;
    status?: boolean;
    updatedAt?: string;
    createdAt?: string;
    companyId?: string;
    __v?: number;
}

export type RoleType = {
    _id?: string;
    id?: string;
    name: string;
    description: string;
    permissions: PermissionType[];
    status?: boolean;
    updatedAt?: string;
    createdAt?: string;
    __v?: number;
}


export type PetOwnerType = {
    _id?: string;
    id?: string;

    status?: boolean;
    updatedAt?: string;
    createdAt?: string;
    __v?: number;
}


export type PetType = {
    _id?: string;
    id?: string;

    status?: boolean;
    updatedAt?: string;
    createdAt?: string;
    __v?: number;
}

export type DoctorType = {
    _id?: string;
    id?: string;

    status?: boolean;
    updatedAt?: string;
    createdAt?: string;
    __v?: number;
}

export type GuestType = {
    _id?: string;
    id?: string;

    status?: boolean;
    updatedAt?: string;
    createdAt?: string;
    __v?: number;
}

