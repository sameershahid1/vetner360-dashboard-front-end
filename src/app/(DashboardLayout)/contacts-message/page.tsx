"use client";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";

import Modal from "@/components/modal";
import { useDispatch, useSelector } from "@/store/hooks";
import { addDoctor, DeleteDoctor, GetDoctorList, UpdateDoctor } from "@/store/slice/doctor";
import { modalContactMessageFields, modalContactMessageTitle } from "@/utils/data/modal";
import { ContactMessageType, PaginationType } from "@/utils/types/table";
import { contactMessageCells, contactMessageColumns } from "@/utils/data/table";
import PageContainer from "@/components/container/PageContainer";
import CustomTable from "@/components/custom-table";
import { ModalMod } from "@/utils/enum/modal";


export default function ContactMessage() {
  const [isModal, setIsModal] = useState<boolean>(false);
  const pagination: PaginationType = useSelector((state) => state.contactMessageReducer.contactMessagePagination)
  const contactMessages: ContactMessageType[] = useSelector((state) => state.contactMessageReducer.contactMessages)
  const dispatch = useDispatch()
  const [editContactMessage, setEditContactMessage] = useState<ContactMessageType>({
    name: "",
    email: "",
    message: "",
    status: false,
  });

  useEffect(() => {
    const fetchContactMessages = async () => {
      try {
        // const { ContactMessageList, newPagination } = await getContactMessage(pagination);
        // if (ContactMessageList) {
        //   dispatch(GetContactMessageList({ list: ContactMessageList, newPagination }))
        // }
      } catch (error) {
        console.log(error);
      }
    };
    fetchContactMessages();
  }, []);

  const handleToggle = () => {
    setIsModal(!isModal);

    if (editContactMessage.status) {
      setEditContactMessage({
        name: "",
        email: "",
        message: "",
        status: false,
      });
    }
  };

  const handleAdd = async (values: any) => {
    try {
      // const { ContactMessage } = await postContactMessage(values);
      // if (ContactMessage) {
      dispatch(addDoctor(values))
      // }
      setIsModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (values: any) => {
    try {
      setIsModal(false);
      // const { ContactMessage } = await patchContactMessage(values);
      // if (ContactMessage) {
      dispatch(UpdateDoctor(values))
      //   setEditContactMessage({
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
      // const { ContactMessage } = await deleteContactMessage(id);
      // if (ContactMessage) {
      dispatch(DeleteDoctor(id))
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id: string) => {
    const contactMessage: (ContactMessageType | undefined) = contactMessages?.find((perm: any) => perm._id === id);

    if (contactMessage) {
      setIsModal(true);
      setEditContactMessage({
        id: contactMessage._id,
        name: contactMessage.name,
        email: contactMessage.email,
        message: contactMessage.message,
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
    ContactMessage: any,
    newValue: string,
    fieldAlias: string,
    setValues: any,
  ) => {
    setValues({
      ...ContactMessage,
      [fieldAlias]: newValue,
    });
  };

  const handleChangePage = async (evt: any, value: number) => {
    try {
      // const { performanceList, newPagination } = await getContactMessage({ ...pagination, page: value });
      // dispatch(GetContactMessageList({ performanceList, newPagination }))
    } catch (error) {
      console.log(error);
    }
  }

  const handleChangeRowsPerPage = async (evt: any) => {
    try {
      // const { performanceList, newPagination } = await getContactMessage({ ...pagination, rowsPerPage: parseInt(evt.target.value) });
      // dispatch(GetContactMessageList({ performanceList, newPagination }))
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PageContainer title="ContactMessage" description="This is ContactMessage ">
      <Box mt={3}>
        <CustomTable
          title={"ContactMessage"}
          rows={contactMessages}
          columns={contactMessageColumns}
          cells={contactMessageCells}
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
            handleSubmit={editContactMessage.status ? handleUpdate : handleAdd}
            handleToggle={handleToggle}
            handleModalFieldOnChange={handleModalFieldOnChange}
            editData={editContactMessage}
            modalFields={modalContactMessageFields}
            isModal={isModal}
            title={
              editContactMessage.status
                ? modalContactMessageTitle[ModalMod.EDIT]
                : modalContactMessageTitle[ModalMod.NEW]
            }
          />
        )}
      </Box>
    </PageContainer>
  );
}
