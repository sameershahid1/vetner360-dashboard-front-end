"use client";
import { useRef, useState } from "react";
import { NextPage } from "next";
import {
  Box,
  DialogContent,
  FormLabel,
  Grid,
  TextField,
  Button,
  Dialog,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import VehicleAutoButton from "../vehicle-auto-button";
import ModalTable from "../modal-table";

type Props = {
  handleModalFieldOnChange: (permission: any, newValue: string, fieldAlias: string, setValues: any) => void;
  handleSubmit: (values: any) => void;
  handleToggle: () => void;
  handleChangePage?: any;
  handleChangeRowsPerPage?: any;
  title: string;
  isModal: boolean;
  editData?: any;
  modalFields: ModelFieldType[];
  columnsPermission?: any;
  tableData?: any;
  permissionPagination?: any;
  setPermissionPagination?: any;
  isAutoButton?: boolean;
  handlePermission?: any;
};

type ErrorType = {
  message: string;
  status: boolean;
}

const Modal: NextPage<Props> = ({
  handleModalFieldOnChange,
  handleToggle,
  handleSubmit,
  handleChangePage,
  handleChangeRowsPerPage,
  columnsPermission,
  handlePermission,
  permissionPagination,
  modalFields,
  tableData,
  editData,
  isModal,
  isAutoButton,
  title,
}) => {
  const [values, setValues] = useState(editData || {});
  const [error, setError] = useState<ErrorType>({ message: "", status: false })
  const formRef = useRef<any>({})

  const handleForm = (evt: any) => {
    evt.preventDefault();
    handleSubmit(values);
  };

  const handleModalClose = () => {
    handleToggle();
  };


  const handleAutoFill = async () => {
    try {
      if (values?.vinNumber.replace(/\s+/g, "").length === 0) {
        setError({ status: true, message: "Please first enter the Vin number to auto Complete the form" })
        return
      }

      const raw = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${values.vinNumber}?format=json`)
      const { Results: results } = await raw.json()
      const filterByNullvalues = results?.filter((field: any) => {
        if (field.Value) {
          return field
        }
      })

      let autoData: any = {}
      filterByNullvalues.forEach((vehicleField: any) => {
        const findField = modalFields.find((field) => field.title === vehicleField.Variable)
        if (findField) {
          autoData = { [findField.alias]: vehicleField.Value, ...autoData }
        }
      })

      if (Object.keys(autoData).length === 0) {
        setError({ status: true, message: "Api request is not completed successfully please fill the form manually to add the vehicle" })
        return
      }

      setValues({
        vinNumber: values.vinNumber,
        ...autoData,
      })

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog
      open={isModal}
      onClose={handleModalClose}
      maxWidth="md"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <Typography sx={{ fontWeight: 600, fontSize: "1.7rem" }}>
          {title}
        </Typography>
        <Box mt={3}>
          {
            error.status &&
            <Typography sx={{ color: "red", textAlign: "center", fontWeight: 500, marginBottom: "1rem" }}>{error.message}</Typography>
          }
          <form ref={formRef} onSubmit={handleForm}>
            <Grid spacing={3} container>
              {modalFields?.map((field: any) => {
                return (
                  <Grid key={field.id} item xs={12} lg={field.column}>
                    <FormLabel sx={{ fontWeight: 600 }}>{field.title}</FormLabel>
                    {field?.isSelect ? (
                      <Select
                        labelId="timeZone"
                        id="timeZone"
                        label="timezone"
                        name="timeZone"
                        defaultValue={values.status ? values[field.alias as never] : field?.selectField[0].value}
                        fullWidth={true}
                        onChange={(evt: any) => {
                          handleModalFieldOnChange(
                            values,
                            evt.target.value,
                            field.alias,
                            setValues,
                          );
                        }}
                      >
                        {field?.selectField.map((select: any) => (
                          <MenuItem key={select.id} value={select.value}>
                            {select.name}
                          </MenuItem>
                        ))}
                      </Select>
                    ) : (
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
                        onChange={(evt: any) => {
                          handleModalFieldOnChange(
                            values,
                            evt.target.value,
                            field.alias,
                            setValues,
                          );
                        }}
                      />
                    )}
                  </Grid>
                );
              })}

              {tableData && (
                <ModalTable
                  handleChangeRowsPerPage={handleChangeRowsPerPage}
                  permissionPagination={permissionPagination}
                  columnsPermission={columnsPermission}
                  tableData={tableData} values={values}
                  handlePermission={handlePermission}
                  handleChangePage={handleChangePage}
                  setValues={setValues}
                />
              )}

              <Grid item xs={12} lg={12}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mr: 1 }}
                  type="submit"
                >
                  Submit
                </Button>
                {
                  isAutoButton && <VehicleAutoButton handleOnClick={handleAutoFill} />
                }
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleModalClose}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;


