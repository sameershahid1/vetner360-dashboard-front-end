"use client";
import { useEffect, useState } from "react";
import PageContainer from "@/components/container/PageContainer";
import { deleteRole, getRole, patchRole, postRole } from "@/utils/request/role";
import { modalRoleTitle, modalRoleFields } from "@/utils/data/modal";
import { PaginationType, PermissionType, RoleType } from "@/utils/types/table";
import { roleCells, roleColumns } from "@/utils/data/table";
import CustomTable from "@/components/custom-table";
import Box from "@mui/material/Box";
import Modal from "@/components/modal";
import { useSelector } from "@/store/hooks";
import { useDispatch } from "react-redux";
import { addRole, DeleteRole, GetRoleList, UpdateRole } from "@/store/slice/role";
import { DeletePermission, GetPermissionList } from "@/store/slice/permission";
import { getPermission } from "@/utils/request/permission/request";
import { ModalMod } from "@/utils/enum/modal";

const columnsPermission = [
  { id: 1, name: "Id" },
  { id: 2, name: "Name" },
  { id: 3, name: "Description" },
  { id: 4, name: "Action" },
];


export default function Role() {
  const [isModal, setIsModal] = useState<boolean>(false);
  const roles: RoleType[] = useSelector((state) => state.roleReducer.role)
  const permission: PermissionType[] = useSelector((state) => state.permissionReducer.permission)
  const permissionPagination: PaginationType = useSelector((state) => state.permissionReducer.permissionPagination)
  const pagination: PaginationType = useSelector((state) => state.roleReducer.rolePagination)
  const dispatch = useDispatch()
  const [editRole, setEditRole] = useState<RoleType>({
    name: "",
    description: "",
    permissions: [],
    status: false,
  });

  useEffect(() => {
    const fetchRole = async () => {
      try {
        // const { roleList, newPagination } = await getRole(pagination);
        // if (roleList) {
        //   dispatch(GetRoleList({ list: roleList, newPagination }))
        // }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRole();
  }, []);

  useEffect(() => {
    const fetchPermission = async () => {
      try {
        // const { permissionList, newPagination } = await getPermission(permissionPagination);
        // if (permissionList) {
        //   dispatch(GetPermissionList({ list: permissionList, newPagination }))
        // }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPermission();
  }, []);

  const handleToggle = () => {
    setIsModal(!isModal);
    if (editRole.status) {
      setEditRole({
        name: "",
        description: "",
        permissions: [],
        status: false,
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      // const { role } = await deleteRole(id);
      // if (role) {
      //   dispatch(DeleteRole(id))
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id: string) => {
    const role = roles.find((role) => role._id === id);
    if (role) {
      setIsModal(true);
      setEditRole({
        id: role?._id,
        name: role.name,
        description: role.description,
        permissions: [...role.permissions],
        status: true,
      });
    }
  };

  const handleAdd = async (values: any) => {
    try {
      // const { role } = await postRole(values);
      // if (role) {
      //   dispatch(addRole(values))
      //   setIsModal(false);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (values: any) => {
    try {
      // const { role } = await patchRole(values);
      // if (role) {
      //   dispatch(UpdateRole(values))
      //   setIsModal(false);
      //   setEditRole({
      //     name: "",
      //     description: "",
      //     permissions: [],
      //     status: false,
      //   });
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePermission = (value: string, values: any, setValues: any) => {
    let updatedPermission: string[] = [];
    const permissionId: string = value ?? "";
    const status: boolean = values?.permissions?.includes(
      permissionId as never,
    );
    updatedPermission = status
      ? values?.permissions.filter((perm: any) => permissionId !== perm)
      : [...values.permissions, permissionId];
    setValues((state: any) => ({
      ...state,
      permissions: [...updatedPermission],
    }));
  };

  const handleModalFieldOnChange = (
    permission: any,
    newValue: string,
    fieldAlias: string,
    setValues: any,
  ) => {
    if (fieldAlias)
      setValues({
        ...permission,
        [fieldAlias]: newValue,
      });
  };

  const renderCell = (rowData: any, name: string, index: number) => {
    if (name === "id") {
      return index + 1;
    }

    if (name === "total-permission") {
      return rowData["permissions"].length;
    }

    return rowData[name as never];
  };

  const handleChangePage = async (evt: any, value: number) => {
    try {
      // const { roleList, newPagination } = await getRole({ ...pagination, page: value });
      // dispatch(GetRoleList({ roleList, newPagination }))
    } catch (error) {
      console.log(error);
    }
  }

  const handleChangeRowsPerPage = async (evt: any) => {
    try {
      // const { roleList, newPagination } = await getRole({ ...pagination, rowsPerPage: parseInt(evt.target.value) });
      // dispatch(GetRoleList({ roleList, newPagination }))
    } catch (error) {
      console.log(error);
    }
  };


  const handlePermissionPaginationChangePage = async (evt: any, value: number) => {
    try {
      // const { permissionList, newPagination } = await getPermission({ ...pagination, page: value });
      // dispatch(GetPermissionList({ list: permissionList, newPagination }))
    } catch (error) {
      console.log(error);
    }
  }

  const handlePermissionPaginationChangeRowsPerPage = async (evt: any) => {
    try {
      // const { permissionList, newPagination } = await getPermission({ ...pagination, rowsPerPage: parseInt(evt.target.value) });
      // dispatch(GetPermissionList({ list: permissionList, newPagination }))
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PageContainer title="Uploads" description="this is Uploads">
      <Box mt={3}>
        <CustomTable
          handleCreate={handleToggle}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleRenderCell={renderCell}
          title={"Role"}
          rows={roles}
          columns={roleColumns}
          cells={roleCells}
          pagination={pagination}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />

        {isModal && permission && (
          <Modal
            handleModalFieldOnChange={handleModalFieldOnChange}
            handleSubmit={editRole.status ? handleUpdate : handleAdd}
            handlePermission={handlePermission}
            handleToggle={handleToggle}
            handleChangePage={handlePermissionPaginationChangePage}
            handleChangeRowsPerPage={handlePermissionPaginationChangeRowsPerPage}
            permissionPagination={permissionPagination}
            columnsPermission={columnsPermission}
            modalFields={modalRoleFields}
            tableData={permission}
            editData={editRole}
            isModal={isModal}
            title={
              editRole.status
                ? modalRoleTitle[ModalMod.EDIT]
                : modalRoleTitle[ModalMod.NEW]
            }
          />
        )}
      </Box>
    </PageContainer>
  );
}
