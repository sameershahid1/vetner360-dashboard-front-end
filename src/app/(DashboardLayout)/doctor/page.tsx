"use client";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";

import Modal from "@/components/modal";
import { useDispatch, useSelector } from "@/store/hooks";
import { addDoctor, DeleteDoctor, GetDoctorList, UpdateDoctor } from "@/store/slice/doctor";
import { modalDoctorFields, modalDoctorTitle } from "@/utils/data/modal";
import { DoctorType, PaginationType } from "@/utils/types/table";
import { doctorCells, doctorColumns } from "@/utils/data/table";
import PageContainer from "@/components/container/PageContainer";
import CustomTable from "@/components/custom-table";
import { ModalMod } from "@/utils/enum/modal";


export default function Doctor() {
  const [isModal, setIsModal] = useState<boolean>(false);
  const pagination: PaginationType = useSelector((state) => state.doctorReducer.doctorPagination)
  const doctors: DoctorType[] = useSelector((state) => state.doctorReducer.doctors)
  const dispatch = useDispatch()
  const [editDoctor, setEditDoctor] = useState<DoctorType>({
    firstName: "",
    lastName: "",
    email: "",
    fatherName: "",
    registrationNo: "",
    gender: "male",
    latitude: 0,
    longitude: 0,
    password: "",
    status: false,
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        // const { DoctorList, newPagination } = await getDoctor(pagination);
        // if (DoctorList) {
        //   dispatch(GetDoctorList({ list: DoctorList, newPagination }))
        // }
      } catch (error) {
        console.log(error);
      }
    };
    fetchDoctors();
  }, []);

  const handleToggle = () => {
    setIsModal(!isModal);

    if (editDoctor.status) {
      setEditDoctor({
        firstName: "",
        lastName: "",
        email: "",
        fatherName: "",
        registrationNo: "",
        gender: "male",
        latitude: 0,
        longitude: 0,
        password: "",
        status: false,
      });
    }
  };

  const handleAdd = async (values: any) => {
    try {
      // const { Doctor } = await postDoctor(values);
      // if (Doctor) {
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
      // const { Doctor } = await patchDoctor(values);
      // if (Doctor) {
      dispatch(UpdateDoctor(values))
      //   setEditDoctor({
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
      // const { Doctor } = await deleteDoctor(id);
      // if (Doctor) {
      dispatch(DeleteDoctor(id))
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id: string) => {
    const doctor: (DoctorType | undefined) = doctors?.find((perm: any) => perm._id === id);

    if (doctor) {
      setIsModal(true);
      setEditDoctor({
        id: doctor._id,
        firstName: doctor?.firstName,
        email: doctor?.email,
        lastName: doctor?.lastName,
        fatherName: doctor?.fatherName,
        registrationNo: doctor?.registrationNo,
        gender: doctor?.gender,
        latitude: doctor?.latitude,
        longitude: doctor?.longitude,
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
    Doctor: any,
    newValue: string,
    fieldAlias: string,
    setValues: any,
  ) => {
    setValues({
      ...Doctor,
      [fieldAlias]: newValue,
    });
  };

  const handleChangePage = async (evt: any, value: number) => {
    try {
      // const { performanceList, newPagination } = await getDoctor({ ...pagination, page: value });
      // dispatch(GetDoctorList({ performanceList, newPagination }))
    } catch (error) {
      console.log(error);
    }
  }

  const handleChangeRowsPerPage = async (evt: any) => {
    try {
      // const { performanceList, newPagination } = await getDoctor({ ...pagination, rowsPerPage: parseInt(evt.target.value) });
      // dispatch(GetDoctorList({ performanceList, newPagination }))
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PageContainer title="Doctor" description="This is Doctor">
      <Box mt={3}>
        <CustomTable
          title={"Doctors"}
          rows={doctors}
          columns={doctorColumns}
          cells={doctorCells}
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
            handleSubmit={editDoctor.status ? handleUpdate : handleAdd}
            handleToggle={handleToggle}
            handleModalFieldOnChange={handleModalFieldOnChange}
            editData={editDoctor}
            modalFields={modalDoctorFields}
            isModal={isModal}
            title={
              editDoctor.status
                ? modalDoctorTitle[ModalMod.EDIT]
                : modalDoctorTitle[ModalMod.NEW]
            }
          />
        )}
      </Box>
    </PageContainer>
  );
}
