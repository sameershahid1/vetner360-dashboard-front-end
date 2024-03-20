export const modalPermissionTitle = ["Add New Permission", "Update Permission"];
export const modalRoleTitle = ["Add New Role", "Update Role"];

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