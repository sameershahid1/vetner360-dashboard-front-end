"use client";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";

import Modal from "@/components/modal";
import { useDispatch, useSelector } from "@/store/hooks";
import { addDoctor, DeleteDoctor, GetDoctorList, UpdateDoctor } from "@/store/slice/doctor";
import { modalGuestFields, modalGuestTitle } from "@/utils/data/modal";
import { GuestType, PaginationType } from "@/utils/types/table";
import { guestCells, guestColumns } from "@/utils/data/table";
import PageContainer from "@/components/container/PageContainer";
import CustomTable from "@/components/custom-table";
import { ModalMod } from "@/utils/enum/modal";


export default function Guest() {
  const [isModal, setIsModal] = useState<boolean>(false);
  const pagination: PaginationType = useSelector((state) => state.guestReducer.guestPagination)
  const guests: GuestType[] = useSelector((state) => state.guestReducer.guest)
  const dispatch = useDispatch()
  const [editGuest, setEditGuest] = useState<GuestType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    status: false,
  });

  useEffect(() => {
    const fetchguests = async () => {
      try {
        // const { GuestList, newPagination } = await getGuest(pagination);
        // if (GuestList) {
        //   dispatch(GetGuestList({ list: GuestList, newPagination }))
        // }
      } catch (error) {
        console.log(error);
      }
    };
    fetchguests();
  }, []);

  const handleToggle = () => {
    setIsModal(!isModal);

    if (editGuest.status) {
      setEditGuest({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        status: false,
      });
    }
  };

  const handleAdd = async (values: any) => {
    try {
      // const { Guest } = await postGuest(values);
      // if (Guest) {
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
      // const { Guest } = await patchGuest(values);
      // if (Guest) {
      dispatch(UpdateDoctor(values))
      //   setEditGuest({
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
      // const { Guest } = await deleteGuest(id);
      // if (Guest) {
      dispatch(DeleteDoctor(id))
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id: string) => {
    const guest: (GuestType | undefined) = guests?.find((perm: any) => perm._id === id);

    if (guest) {
      setIsModal(true);
      setEditGuest({
        id: guest._id,
        firstName: guest.firstName,
        lastName: guest.lastName,
        email: guest.email,
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
    Guest: any,
    newValue: string,
    fieldAlias: string,
    setValues: any,
  ) => {
    setValues({
      ...Guest,
      [fieldAlias]: newValue,
    });
  };

  const handleChangePage = async (evt: any, value: number) => {
    try {
      // const { performanceList, newPagination } = await getGuest({ ...pagination, page: value });
      // dispatch(GetGuestList({ performanceList, newPagination }))
    } catch (error) {
      console.log(error);
    }
  }

  const handleChangeRowsPerPage = async (evt: any) => {
    try {
      // const { performanceList, newPagination } = await getGuest({ ...pagination, rowsPerPage: parseInt(evt.target.value) });
      // dispatch(GetGuestList({ performanceList, newPagination }))
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PageContainer title="Guest" description="This is Guest ">
      <Box mt={3}>
        <CustomTable
          title={"Guest"}
          rows={guests}
          columns={guestColumns}
          cells={guestCells}
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
            handleSubmit={editGuest.status ? handleUpdate : handleAdd}
            handleToggle={handleToggle}
            handleModalFieldOnChange={handleModalFieldOnChange}
            editData={editGuest}
            modalFields={modalGuestFields}
            isModal={isModal}
            title={
              editGuest.status
                ? modalGuestTitle[ModalMod.EDIT]
                : modalGuestTitle[ModalMod.NEW]
            }
          />
        )}
      </Box>
    </PageContainer>
  );
}
