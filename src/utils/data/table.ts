import { CellType } from "../types/table";


export const permissionColumns: CellType[] = [
    { id: 1, name: "Id" },
    { id: 2, name: "Name" },
    { id: 3, name: "Description" },
    { id: 4, name: "Path" },
    { id: 5, name: "Action" },
];

export const permissionCells: CellType[] = [
    { id: 1, name: "id" },
    { id: 2, name: "name" },
    { id: 3, name: "description" },
    { id: 4, name: "path" },
];

export const roleColumns: CellType[] = [
    { id: 1, name: "Id" },
    { id: 2, name: "Name" },
    { id: 3, name: "Description" },
    { id: 4, name: "Total Permission" },
    { id: 5, name: "Action" },
];

export const roleCells: CellType[] = [
    { id: 1, name: "id" },
    { id: 2, name: "name" },
    { id: 3, name: "description" },
    { id: 4, name: "total-permission" },
];