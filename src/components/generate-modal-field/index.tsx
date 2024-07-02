"use client"

import { Button, FormControlLabel, FormLabel, MenuItem, Paper, Select, TextField } from "@mui/material";
import CustomCheckbox from "@/components/forms/theme-elements/CustomCheckbox";
import { IconCloudUpload } from "@tabler/icons-react";
import { FieldType } from "@/utils/types/modal";
import { useEffect, useState } from "react";
import { NextPage } from "next";
// import dynamic from 'next/dynamic'
// const DynamicQuill = dynamic(() => import('react-quill'), { ssr: false })
// import "react-quill/dist/quill.snow.css";
// import './style.css'


type Props = {
    values: any;
    field: FieldType;
    handleModalFieldOnChange: any;
    setValues: any;
}


const GenerateModalField: NextPage<Props> = ({
    values, field, handleModalFieldOnChange, setValues,
}) => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        if (document) {
            setIsMounted(true);
        }
    }, [document]);


    if (field.type === "select" && field.selectField) {
        const defaultValue = values.status ? values[field.alias as never] : 0;
        return (
            <>
                <FormLabel sx={{ fontWeight: 600 }}>{field.title}</FormLabel>
                <Select
                    labelId="timeZone"
                    id="timeZone"
                    label="timezone"
                    name="timeZone"
                    fullWidth={true}
                    sx={{ width: "100% !important" }}
                    defaultValue={defaultValue}
                    onChange={(evt: any) => {
                        if (evt.target.value !== 0) {
                            handleModalFieldOnChange(
                                values,
                                evt.target.value,
                                field.alias,
                                setValues
                            );
                        }
                    }}
                >
                    <MenuItem key={0} value={0}>
                        Select {field.alias}
                    </MenuItem>
                    {field.selectField.map((select: any) => (
                        <MenuItem key={select.id} value={select.value}>
                            {select.name}
                        </MenuItem>
                    ))}
                </Select>
            </>);
    }
    else if (field.type === "upload") {
        return (
            <>
                <FormLabel sx={{ fontWeight: 600 }}>{field.title}</FormLabel>
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    sx={{ width: "100%" }}
                    startIcon={<IconCloudUpload />}
                >
                    Upload {field.title}
                    <input type="file" hidden onChange={() => { }} />
                </Button>
            </>
        );
    }
    else if (field.type === "checkbox") {
        return (
            <FormControlLabel
                control={
                    <CustomCheckbox
                        defaultChecked
                        color="secondary"
                        inputProps={{ 'aria-label': 'checkbox with default color' }}
                    />
                }
                label={field.title}
            />
        );
    }
    // else if (field.type === "quill") {
    //     return (
    //         <>
    //             <FormLabel sx={{ fontWeight: 600 }}>{field.title}</FormLabel>
    //             <Paper sx={{ border: "1px solid" }} variant="outlined">
    //                 {
    //                     isMounted && (
    //                         <DynamicQuill
    //                             theme="snow"
    //                             value={values[field.alias as never]}
    //                             onChange={(value: any) => {
    //                                 handleModalFieldOnChange(
    //                                     values,
    //                                     value,
    //                                     field.alias,
    //                                     setValues
    //                                 );
    //                             }}
    //                             placeholder="Type content here..."
    //                         />
    //                     )
    //                 }
    //             </Paper>
    //         </>
    //     )
    // }
    else if (field.type === "label") {
        return (
            <FormLabel sx={{ fontWeight: 600 }}>{field.title}</FormLabel>
        )
    }
    else {
        return (
            <>
                <FormLabel sx={{ fontWeight: 600 }}>{field.title}</FormLabel>
                <TextField
                    id="name"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={values[field.alias as never]}
                    placeholder={field.placeholder ?? ""}
                    rows={field.rows ?? 1}
                    multiline={field.multiline ?? false}
                    type={field.type}
                    sx={{ width: "100% !important" }}
                    onChange={(evt: any) => {
                        handleModalFieldOnChange(
                            values,
                            evt.target.value,
                            field.alias,
                            setValues
                        );
                    }} />
            </>
        );
    }
};

export default GenerateModalField