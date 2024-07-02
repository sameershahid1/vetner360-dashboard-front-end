"use client"

import { NextPage } from "next/types";
import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tooltip,
    IconButton,
    Grid,
    TablePagination,
    Button,
} from "@mui/material";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import DashboardCard from "../shared/DashboardCard";
import ModalAddButton from "../modal-add-button";
import { CellType, PaginationType } from "@/utils/types/table";
import { FieldType } from "@/utils/types/modal";
import { useState } from "react";
import AlertDialog from "../alert-dialog";
import GenerateModalField from "../generate-modal-field";
import './style.css';

type Props = {
    title: string;
    rows: any[];
    columns: CellType[];
    cells: CellType[];
    pagination: PaginationType;
    removeAddButton?: boolean;
    removeEditButton?: boolean;
    removeDeleteButton?: boolean;
    filterFieldList?: FieldType[];
    handleRenderCell: ((rowData: any, name: string, index: number) => string | undefined);
    handleCreate?: (() => void | undefined);
    handleDelete?: ((id: string) => Promise<void> | undefined);
    handleEdit?: ((id: string) => void | undefined);
    handleFilter?: any;
    handleChangePage: (evt: any, value: number) => void;
    handleChangeRowsPerPage: (evt: any) => void;
    handleFilterFieldOnChange?: (permission: any, newValue: string, fieldAlias: string, setValues: any) => void;
};

const ReusableTable: NextPage<Props> = ({
    rows,
    columns,
    title,
    cells,
    pagination,
    removeAddButton,
    removeEditButton,
    removeDeleteButton,
    filterFieldList,
    handleChangeRowsPerPage,
    handleChangePage,
    handleCreate,
    handleDelete,
    handleEdit,
    handleRenderCell,
    handleFilter,
    handleFilterFieldOnChange
}) => {
    const [open, setOpen] = useState({ isModal: false, id: "" });
    const AddButton = !removeAddButton ? <ModalAddButton handleCreate={handleCreate} /> : <></>
    const [values, setValues] = useState({});

    const handleClickOpen = (id: string) => {
        setOpen({ isModal: true, id: id });
    };

    const handleClose = () => {
        setOpen({ isModal: false, id: "" });
    };

    const handleConformMessage = () => {
        if (handleDelete) {
            setOpen({ isModal: false, id: "" })
            handleDelete(open.id)
        }
    }

    const handleShowMessage = () => { }


    return (
        <DashboardCard title={title} action={AddButton}>
            <Box>
                {
                    <AlertDialog handleAccept={handleConformMessage} handleClose={handleClose} open={open.isModal} />
                }
                {
                    filterFieldList && handleFilterFieldOnChange && handleFilter && (
                        <form onSubmit={handleFilter}>
                            <Box className="rt-form-container">
                                <Grid container className="rt-field-container">
                                    {
                                        filterFieldList?.map((filter: any) => {
                                            return (
                                                <Grid key={filter.id} item xs={filter.columnSmall} md={filter.columnMedium} lg={filter.columnLarge} className="rt-field">
                                                    <GenerateModalField
                                                        values={values}
                                                        setValues={setValues}
                                                        handleModalFieldOnChange={handleFilterFieldOnChange}
                                                        field={filter}
                                                    />
                                                </Grid>
                                            )
                                        })
                                    }
                                </Grid>
                                <Box className="rt-btn-filter-container">
                                    <Button variant="contained" type="submit" fullWidth>Filter</Button>
                                </Box>
                            </Box>
                        </form>)
                }
                <Box sx={{ overflow: "auto" }}>
                    <Table
                        aria-label="simple table"
                        sx={{
                            whiteSpace: "nowrap",
                            mt: 2,
                        }}
                    >
                        <TableHead>
                            <TableRow>
                                {columns?.map((column: CellType) => {
                                    return (
                                        <TableCell key={column?.id}>
                                            <Typography
                                                textAlign={"center"}
                                                fontWeight={600}
                                                sx={{ color: "#2A3547" }}
                                            >
                                                {column?.name}
                                            </Typography>
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows?.map((row: any, index: number) => {
                                return (
                                    <TableRow key={row?.token}>
                                        {cells?.map((cell: CellType) => {
                                            const name = cell?.name;
                                            return (
                                                <TableCell key={cell.id}>
                                                    <Typography
                                                        textAlign={"center"}
                                                        sx={{
                                                            fontSize: "15px",
                                                            fontWeight: "500",
                                                            color: "#2A3547"
                                                        }}
                                                    >
                                                        {handleRenderCell(row, name, index)}
                                                    </Typography>
                                                </TableCell>
                                            );
                                        })}
                                        <TableCell sx={{ display: "flex", justifyContent: "center" }}>
                                            {
                                                !removeDeleteButton &&
                                                <Tooltip
                                                    title="Delete"
                                                    onClick={handleShowMessage}
                                                >
                                                    <IconButton onClick={() => handleClickOpen(row.token)} color="error">
                                                        <IconTrash width={26} height={26} />
                                                    </IconButton>
                                                </Tooltip>
                                            }
                                            {
                                                !removeEditButton &&
                                                <Tooltip title={"Edit"}>
                                                    <IconButton onClick={() => handleEdit && handleEdit(row?.token)}>
                                                        <IconPencil size="25" stroke={2} />
                                                    </IconButton>
                                                </Tooltip>
                                            }
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Box>
                <Grid item lg={12} sm={12} mt={3}>
                    <TablePagination
                        rowsPerPageOptions={[10]}
                        component="div"
                        count={pagination.totalSize}
                        rowsPerPage={pagination.rowsPerPage}
                        page={pagination.page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Grid>
            </Box>
        </DashboardCard >
    );
};

export default ReusableTable;


