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
    Fab,
    Grid,
    TablePagination,
} from "@mui/material";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import DashboardCard from "../shared/DashboardCard";
import { CellType, PaginationType } from "@/utils/types/table";


type Props = {
    title: string;
    rows: any[];
    columns: CellType[];
    cells: CellType[];
    pagination: PaginationType;
    handleRenderCell: (rowData: any, name: string, index: number) => string;
    handleCreate: () => void;
    handleDelete: (id: string) => void;
    handleEdit: (id: string) => void;
    handleChangePage: (evt: any, value: number) => void;
    handleChangeRowsPerPage: (evt: any) => void;
};

const CustomTable: NextPage<Props> = ({
    rows,
    columns,
    title,
    cells,
    pagination,
    handleChangeRowsPerPage,
    handleChangePage,
    handleCreate,
    handleDelete,
    handleEdit,
    handleRenderCell,
}) => {
    const addButton = (
        <Tooltip title="Add" onClick={handleCreate}>
            <Fab color="secondary">
                <IconPlus width={20} height={20} />
            </Fab>
        </Tooltip>
    );

    return (
        <DashboardCard title={title} action={addButton}>
            <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
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
                                <TableRow key={row?._id}>
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
                                        <Tooltip
                                            title="Delete"
                                            onClick={() => {
                                                handleDelete(row._id);
                                            }}
                                        >
                                            <IconButton color="error">
                                                <IconTrash width={26} height={26} />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title={"Edit"}>
                                            <IconButton onClick={() => handleEdit(row?._id)}>
                                                <IconPencil size="25" stroke={2} />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
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
        </DashboardCard>
    );
};

export default CustomTable;
