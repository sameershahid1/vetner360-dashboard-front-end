type SelectOption = {
    id: number;
    name: string;
    value: string;
}


type ModelFieldType = {
    id: number;
    title: string;
    alias: string;
    type: string;
    column: number;
    placeholder?: string;
    rows?: number;
    multiline?: boolean;
    isSelect?: boolean;
    selectField?: SelectOption[];
}

