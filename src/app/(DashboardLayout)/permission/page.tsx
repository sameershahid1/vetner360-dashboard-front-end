"use client";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";

import Modal from "@/components/modal";
import { useDispatch, useSelector } from "@/store/hooks";
import { addPermission, DeletePermission, GetPermissionList, UpdatePermission } from "@/store/slice/permission";
import { modalPermissionFields, modalPermissionTitle } from "@/utils/data/modal";
import { PaginationType, PermissionType } from "@/utils/types/table";
import { ModalMod } from "@/utils/enum/modal";
import { permissionCells, permissionColumns } from "@/utils/data/table";
import CustomTable from "@/components/custom-table";
import PageContainer from "@/components/container/PageContainer";
import { deletePermission, getPermission, patchPermission, postPermission } from "@/utils/request/permission/request";


export default function Permission() {
  const [isModal, setIsModal] = useState<boolean>(false);
  const pagination: PaginationType = useSelector((state) => state.permissionReducer.permissionPagination)
  const permissions: PermissionType[] = useSelector((state) => state.permissionReducer.permission)
  const dispatch = useDispatch()
  const [editPermission, setEditPermission] = useState<PermissionType>({
    name: "",
    path: "",
    description: "",
    status: false,
  });

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        // const { permissionList, newPagination } = await getPermission(pagination);
        // if (permissionList) {
        //   dispatch(GetPermissionList({ list: permissionList, newPagination }))
        // }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPermissions();
  }, []);

  const handleToggle = () => {
    setIsModal(!isModal);

    if (editPermission.status) {
      setEditPermission({
        name: "",
        path: "",
        description: "",
        status: false,
      });
    }
  };

  const handleAdd = async (values: any) => {
    try {
      // const { permission } = await postPermission(values);
      // if (permission) {
      //   dispatch(addPermission(values))
      // }
      setIsModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (values: any) => {
    try {
      setIsModal(false);
      // const { permission } = await patchPermission(values);
      // if (permission) {
      //   dispatch(UpdatePermission(values))
      //   setEditPermission({
      //     name: "",
      //     path: "",
      //     description: "",
      //     status: false,
      //   });
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      // const { permission } = await deletePermission(id);
      // if (permission) {
      //   dispatch(DeletePermission(id))
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id: string) => {
    const permissionData = permissions?.find((perm: any) => perm._id === id);

    if (permissionData) {
      setIsModal(true);
      setEditPermission({
        id: permissionData._id,
        name: permissionData.name,
        path: permissionData.path,
        description: permissionData.description,
        status: true,
      });
    }
  };

  const renderCell = (rowData: any, name: string, index: number) => {
    if (name === "id") {
      return index + 1;
    }

    return rowData[name as never];
  };

  const handleModalFieldOnChange = (
    permission: any,
    newValue: string,
    fieldAlias: string,
    setValues: any,
  ) => {
    setValues({
      ...permission,
      [fieldAlias]: newValue,
    });
  };

  const handleChangePage = async (evt: any, value: number) => {
    try {
      // const { performanceList, newPagination } = await getPermission({ ...pagination, page: value });
      // dispatch(GetPermissionList({ performanceList, newPagination }))
    } catch (error) {
      console.log(error);
    }
  }

  const handleChangeRowsPerPage = async (evt: any) => {
    try {
      // const { performanceList, newPagination } = await getPermission({ ...pagination, rowsPerPage: parseInt(evt.target.value) });
      // dispatch(GetPermissionList({ performanceList, newPagination }))
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PageContainer title="Uploads" description="this is Uploads">
      <Box mt={3}>
        <CustomTable
          rows={permissions}
          columns={permissionColumns}
          cells={permissionCells}
          title={"Permission"}
          pagination={pagination}
          handleCreate={handleToggle}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleRenderCell={renderCell}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />

        {isModal && (
          <Modal
            handleSubmit={editPermission.status ? handleUpdate : handleAdd}
            handleToggle={handleToggle}
            handleModalFieldOnChange={handleModalFieldOnChange}
            editData={editPermission}
            modalFields={modalPermissionFields}
            isModal={isModal}
            title={
              editPermission.status
                ? modalPermissionTitle[ModalMod.EDIT]
                : modalPermissionTitle[ModalMod.NEW]
            }
          />
        )}
      </Box>
    </PageContainer>
  );
}
