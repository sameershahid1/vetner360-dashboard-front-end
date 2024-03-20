import { Checkbox, Grid, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { PaginationType } from "@/utils/types/table";
import { NextPage } from "next";

type Props = {
    permissionPagination: PaginationType;
    handleChangePage?: any;
    handleChangeRowsPerPage?: any;
    columnsPermission: any;
    handlePermission: any;
    tableData: any;
    setValues: any;
    values: any;
}


const ModalTable: NextPage<Props> = ({
    handleChangeRowsPerPage,
    handleChangePage,
    permissionPagination,
    columnsPermission,
    handlePermission,
    tableData,
    setValues,
    values,
}) => {


    return (
        <Grid
            item
            xs={12}
            lg={12}
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                textAlign: "center",
            }}
        >
            <Table
                aria-label="simple table"
                sx={{
                    whiteSpace: "nowrap",
                    mt: 2,
                }}
            >
                <TableHead>
                    <TableRow>
                        {columnsPermission?.map((column: any) => {
                            return (
                                <TableCell key={column?.id}>
                                    <Typography
                                        textAlign={"center"}
                                        fontWeight={600}
                                        color="#2A3547"
                                    >
                                        {column?.name}
                                    </Typography>
                                </TableCell>
                            );
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData?.map((row: any, index: number) => (
                        <TableRow key={row?._id}>
                            <TableCell>
                                <Typography
                                    textAlign={"center"}
                                    sx={{
                                        fontSize: "15px",
                                        fontWeight: "500",
                                        color: "#2A3547 !important"
                                    }}
                                >
                                    {index + 1}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    textAlign={"center"}
                                    variant="subtitle2"
                                    color="#2A3547 !important"
                                    fontWeight={400}
                                >
                                    {row?.name
                                        ?.replace("-", " ")
                                        .replace(/\b\w/g, (match: string) =>
                                            match.toUpperCase(),
                                        )}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    color="#2A3547 !important"
                                    variant="subtitle2"
                                    textAlign={"center"}
                                    fontWeight={400}
                                >
                                    {row?.description}
                                </Typography>
                            </TableCell>
                            <TableCell
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Checkbox
                                    color="primary"
                                    icon={<CheckBoxOutlineBlankIcon />}
                                    checkedIcon={<CheckBoxIcon />}
                                    name={row?.name}
                                    value={row?._id}
                                    onChange={(evt: any) => {
                                        handlePermission(
                                            evt.target.value,
                                            values,
                                            setValues,
                                        );
                                    }}
                                    checked={values?.permissions?.includes(
                                        row?._id as never,
                                    )}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {permissionPagination &&
                <Grid item lg={12} sm={12} mt={3}>
                    <TablePagination
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPage={permissionPagination.rowsPerPage}
                        count={permissionPagination.totalSize}
                        rowsPerPageOptions={[10]}
                        page={permissionPagination.page}
                        onPageChange={handleChangePage}
                        component="div"
                    />
                </Grid>
            }
        </Grid>
    )
}

export default ModalTable