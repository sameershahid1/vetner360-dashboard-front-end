export const modalPermissionTitle = ["Add New Permission", "Update Permission"];
export const modalRoleTitle = ["Add New Role", "Update Role"];
export const modalPetOwnerTitle = ["Add New Pet Owner", "Update Pet Owner"];
export const modalDoctorTitle = ["Add New Doctor", "Update Doctor"];
export const modalGuestTitle = ["Add New Guest", "Update Guest"];
export const modalContactMessageTitle = ["Add New Contact Message", "Update Contact Message"];

export const modalPermissionFields: ModelFieldType[] = [
    {
        id: 1,
        title: "Name",
        alias: "name",
        type: "text",
        column: 6,
    },
    {
        id: 2,
        title: "Path",
        alias: "path",
        type: "text",
        column: 6,
    },
    {
        id: 3,
        title: "Description",
        alias: "description",
        type: "text",
        placeholder: "Enter Description here",
        rows: 5,
        multiline: true,
        column: 12,
    },
];


export const modalRoleFields: ModelFieldType[] = [
    {
        id: 1,
        title: "Name",
        alias: "name",
        type: "text",
        column: 12,
    },
    {
        id: 3,
        title: "Description",
        alias: "description",
        type: "text",
        placeholder: "Enter Description here",
        rows: 5,
        multiline: true,
        column: 12,
    },
];



export const modalDoctorFields: ModelFieldType[] = [
    {
        id: 1,
        title: "First Name",
        alias: "firstName",
        type: "text",
        column: 6,
    },
    {
        id: 2,
        title: "Last Name",
        alias: "lastName",
        type: "text",
        column: 6,
    },
    {
        id: 3,
        title: "Email",
        alias: "email",
        type: "text",
        column: 6,
    },
    {
        id: 4,
        title: "Father Name",
        alias: "fatherName",
        type: "text",
        column: 6,
    },
    {
        id: 5,
        title: "Registration-No",
        alias: "registrationNo",
        type: "text",
        column: 6,
    },
    {
        id: 6,
        title: "Gender",
        alias: "gender",
        type: "text",
        column: 6,
        isSelect: true,
        selectField: [
            {
                id: 1,
                name: "Male",
                value: "male",
            },
            {
                id: 2,
                name: "Female",
                value: "female",
            },
        ]
    },
    {
        id: 7,
        title: "Latitude",
        alias: "latitude",
        type: "number",
        column: 6,
    },
    {
        id: 8,
        title: "Longitude",
        alias: "longitude",
        type: "number",
        column: 6,
    },
    {
        id: 8,
        title: "Password",
        alias: "password",
        type: "string",
        column: 6,
    },
];


export const modalGuestFields: ModelFieldType[] = [
    {
        id: 1,
        title: "First Name",
        alias: "firstName",
        type: "text",
        column: 6,
    },
    {
        id: 2,
        title: "Last Name",
        alias: "lastName",
        type: "text",
        column: 6,
    },
    {
        id: 3,
        title: "Email",
        alias: "email",
        type: "text",
        column: 6,
    },
    {
        id: 4,
        title: "Password",
        alias: "password",
        type: "text",
        column: 6,
    },
]


export const modalPetOwnerFields: ModelFieldType[] = [
    {
        id: 1,
        title: "First Name",
        alias: "firstName",
        type: "text",
        column: 6,
    },
    {
        id: 2,
        title: "Last Name",
        alias: "lastName",
        type: "text",
        column: 6,
    },
    {
        id: 3,
        title: "Email",
        alias: "email",
        type: "text",
        column: 6,
    },
    {
        id: 4,
        title: "Password",
        alias: "password",
        type: "text",
        column: 6,
    },
]


export const modalPetFields: ModelFieldType[] = [
    {
        id: 1,
        title: "Name",
        alias: "name",
        type: "text",
        column: 6,
    },
    {
        id: 2,
        title: "Type",
        alias: "type",
        type: "text",
        column: 6,
    },
    {
        id: 3,
        title: "Breed",
        alias: "breed",
        type: "text",
        column: 6,
    },
]

export const modalContactMessageFields: ModelFieldType[] = [
    {
        id: 1,
        title: "Name",
        alias: "name",
        type: "text",
        column: 6,
    },
    {
        id: 2,
        title: "Email",
        alias: "email",
        type: "text",
        column: 6,
    },
    {
        id: 3,
        title: "Message",
        alias: "message",
        type: "text",
        column: 6,
    },
]