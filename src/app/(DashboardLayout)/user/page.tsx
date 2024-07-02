"use client";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@/components/modal";
import { useDispatch, useSelector } from "@/store/hooks";
import { modalUserFields, modalUserTitle } from "@/utils/data/modal";
import { UserType, PaginationType } from "@/utils/types/table";
import { userCells, userColumns } from "@/utils/data/table";
import PageContainer from "@/components/container/PageContainer";
import ReusableTable from "@/components/custom-table";
import { addUser, DeleteUser, GetUserList, UpdateUser } from "@/store/slice/user";
import { deleteUser, getUser, patchUser, postUser } from "@/utils/request/user";
import { ResponseType } from "@/utils/types/request";
import { ModalMod } from "@/utils/enum/modal";


export default function User() {
  const [isModal, setIsModal] = useState<boolean>(false);
  const pagination: PaginationType = useSelector((state) => state.userReducer.pagination)
  const users: UserType[] = useSelector((state) => state.userReducer.users)
  const dispatch = useDispatch()
  const [editUser, setEditUser] = useState<UserType>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    password: "",
    status: false,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const newPagination = {
          page: 1,
          limit: 10,
        }
        const response: ResponseType = await getUser(newPagination, "petOwner");
        if (response.records) {
          dispatch(GetUserList({
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
    fetchUsers();
  }, []);

  const handleToggle = () => {
    setIsModal(!isModal);

    if (editUser.status) {
      setEditUser({
        firstName: "",
        lastName: "",
        email: "",
        phoneNo: "",
        password: "",
        status: false,
      });
    }
  };

  const handleAdd = async (values: any) => {
    try {
      const newUser = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNo: values.phoneNo,
        password: values.password,
        userType: 1,
      }
      const response = await postUser(newUser);
      if (response?.status) {
        dispatch(addUser(newUser))
      }
      console.log(response.message)
      setIsModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (values: any) => {
    try {
      setIsModal(false);
      const updateUser = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNo: values.phoneNo,
        password: values.password,
        userType: 1,
      }
      const response = await patchUser(updateUser, values.id);
      if (response?.status) {
        setEditUser({
          firstName: "",
          lastName: "",
          email: "",
          phoneNo: "",
          password: "",
          status: false,
        });
        dispatch(UpdateUser(values))
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteUser(id);
      if (response?.status) {
        dispatch(DeleteUser(id))
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id: string) => {
    const user: (UserType | undefined) = users?.find((perm: any) => perm.token === id);

    if (user) {
      setIsModal(true);
      setEditUser({
        id: id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNo: user.phoneNo,
        password: "",
        status: true,
      });
    }
  };

  const renderCell = (rowData: any, name: string, index: number) => {
    if (name === "id") {
      return index + 1;
    }

    if (name == "name") {
      return `${rowData?.firstName} ${rowData?.lastName}`
    }

    return rowData[name as never];
  };

  const handleModalFieldOnChange = (
    user: any,
    newValue: string,
    fieldAlias: string,
    setValues: any,
  ) => {
    setValues({
      ...user,
      [fieldAlias]: newValue,
    });
  };

  const handleChangePage = async (evt: any, value: number) => {
    try {
      if (value > 0) {
        const newPagination = {
          page: value,
          limit: 10,
        }
        const response: ResponseType = await getUser(newPagination, "petOwner");
        if (response.records) {
          dispatch(GetUserList({
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PageContainer title="Users" description="This is users">
      <Box mt={3}>
        <ReusableTable
          title={"Users"}
          rows={users}
          columns={userColumns}
          cells={userCells}
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
            handleSubmit={editUser.status ? handleUpdate : handleAdd}
            handleToggle={handleToggle}
            handleModalFieldOnChange={handleModalFieldOnChange}
            editData={editUser}
            modalFields={modalUserFields}
            isModal={isModal}
            title={
              editUser.status
                ? modalUserTitle[ModalMod.EDIT]
                : modalUserTitle[ModalMod.NEW]
            }
          />
        )}
      </Box>
    </PageContainer>
  );
}
