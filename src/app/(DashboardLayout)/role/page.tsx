"use client";
import { useEffect, useState } from "react";
import PageContainer from "@/components/container/PageContainer";
import { modalRoleTitle, modalRoleFields } from "@/utils/data/modal";
import { roleCells, roleColumns } from "@/utils/data/table";
import ReusableTable from "@/components/custom-table";
import Box from "@mui/material/Box";
import Modal from "@/components/modal";
import { useSelector } from "@/store/hooks";
import { useDispatch } from "react-redux";
import { ModalMod } from "@/utils/enum/modal";
import { ResponseType } from "@/utils/types/request";
import { deleteRole, getRole, patchRole, postRole } from "@/utils/request/role";
import { addRole, DeleteRole, GetRoleList, UpdateRole } from "@/store/slice/role";
import { PaginationType, RoleType } from "@/utils/types/table";


export default function Role() {
  const [isModal, setIsModal] = useState<boolean>(false);
  const roles: RoleType[] = useSelector((state) => state.roleReducer.role)
  console.log(roles)
  const pagination: PaginationType = useSelector((state) => state.roleReducer.pagination)
  const dispatch = useDispatch()
  const [editRole, setEditRole] = useState<RoleType>({
    name: "",
    description: "",
    status: false,
  });

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const newPagination = {
          page: 1,
          limit: 10,
        }
        const response: ResponseType = await getRole(newPagination);
        if (response.records) {
          dispatch(GetRoleList({
            list: response.records,
            newPagination: {
              page: newPagination.page,
              totalSize: response.count,
              rowsPerPage: newPagination.limit
            }
          }))
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRole();
  }, []);


  const handleToggle = () => {
    setIsModal(!isModal);
    if (editRole.status) {
      setEditRole({
        name: "",
        description: "",
        status: false,
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteRole(id);
      console.log(response.message)
      if (response.status) {
        dispatch(DeleteRole(id))
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id: string) => {
    const role = roles.find((role) => role.token === id);
    if (role) {
      setIsModal(true);
      setEditRole({
        id: id,
        name: role.name,
        description: role.description,
        status: true,
      });
    }
  };

  const handleAdd = async (values: any) => {
    try {
      const newRole = {
        name: values.name,
        description: values.description
      }
      const response = await postRole(newRole);
      if (response.status) {
        dispatch(addRole(values))
        setIsModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (values: any) => {
    try {
      const updateRole = {
        name: values.name,
        description: values.description
      }
      const response = await patchRole(updateRole, values.id);
      console.log(values)
      if (response.status) {
        dispatch(UpdateRole(values))
        setEditRole({
          id: "",
          name: "",
          description: "",
          status: false,
        });
        setIsModal(false);
      }
    } catch (error) {
      console.log(error);
    }
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


    return rowData[name as never];
  };

  const handleChangePage = async (evt: any, value: number) => {
    try {
      if (value > 0) {
        const newPagination = {
          page: value,
          limit: 10,
        }
        const response: ResponseType = await getRole(newPagination);
        if (response.records) {
          dispatch(GetRoleList({
            list: response.records,
            newPagination: {
              page: newPagination.page,
              totalSize: response.count,
              rowsPerPage: newPagination.limit
            }
          }))
        }
      }
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


  return (
    <PageContainer title="Role" description="This is roles.">
      <Box mt={3}>
        <ReusableTable
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

        {isModal && (
          <Modal
            handleModalFieldOnChange={handleModalFieldOnChange}
            handleSubmit={editRole.status ? handleUpdate : handleAdd}
            handleToggle={handleToggle}
            modalFields={modalRoleFields}
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
