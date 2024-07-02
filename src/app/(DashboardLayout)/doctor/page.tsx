"use client";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "@/store/hooks";
import { addDoctor, DeleteDoctor, GetDoctorList, UpdateDoctor } from "@/store/slice/doctor";
import { DoctorType, PaginationType } from "@/utils/types/table";
import { doctorCells, doctorColumns } from "@/utils/data/table";
import { deleteDoctor, getDoctor } from "@/utils/request/doctor";
import PageContainer from "@/components/container/PageContainer";
import ReusableTable from "@/components/custom-table";
import { ResponseType } from "@/utils/types/request";


export default function Doctor() {
  const [isModal, setIsModal] = useState<boolean>(false);
  const pagination: PaginationType = useSelector((state) => state.doctorReducer.pagination)
  const doctors: DoctorType[] = useSelector((state) => state.doctorReducer.doctors)
  const dispatch = useDispatch()
  const [editDoctor, setEditDoctor] = useState<DoctorType>({
    firstName: "",
    lastName: "",
    phoneNo: "",
    email: "",
    fatherName: "",
    registration: "",
    clinicName: "",
    location: {
      type: "",
      coordinates: [],
    },
    experience: "",
    bio: "",
    password: "",
    accountStatus: "",
    status: false,
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
          const newPagination = {
            page: 1,
            limit: 10,
          }
          const response: ResponseType = await getDoctor(newPagination);
          if (response.records) {
            dispatch(GetDoctorList({
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
    fetchDoctors();
  }, []);

  const handleToggle = () => {
    setIsModal(!isModal);

    if (editDoctor.status) {
      setEditDoctor({
        firstName: "",
        lastName: "",
        phoneNo: "",
        email: "",
        fatherName: "",
        registration: "",
        clinicName: "",
        location: {
          type: "",
          coordinates: [],
        },
        experience: "",
        bio: "",
        password: "",
        accountStatus: "",
        token: "",
        roleId: "",
        status: false,
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteDoctor(id);
      if (response?.status) {
        dispatch(DeleteDoctor(id))
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id: string) => {
    const doctor: (DoctorType | undefined) = doctors?.find((perm: any) => perm.token === id);

    if (doctor) {
      setIsModal(true);
      setEditDoctor({
        firstName: doctor.firstName,
        lastName: doctor.lastName,
        phoneNo: doctor.phoneNo,
        email: doctor.email,
        fatherName: doctor.fatherName,
        registration: doctor.registration,
        clinicName: doctor.clinicName,
        location: doctor.location,
        experience: doctor.experience,
        bio: doctor.bio,
        password: doctor.password,
        accountStatus: doctor.accountStatus,
        token: doctor.token,
        roleId: doctor.roleId,
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


  const handleChangePage = async (evt: any, value: number) => {
    try {
      if (value > 0) {
        const newPagination = {
          page: value,
          limit: 10,
        }
        const response: ResponseType = await getDoctor(newPagination);
        if (response.records) {
          dispatch(GetDoctorList({
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
    <PageContainer title="Doctor" description="This is Doctor">
      <Box mt={3}>
        <ReusableTable
          title={"Doctors"}
          rows={doctors}
          columns={doctorColumns}
          cells={doctorCells}
          pagination={pagination}
          removeAddButton={true}
          removeEditButton={true}
          handleEdit={handleEdit}
          handleCreate={handleToggle}
          handleDelete={handleDelete}
          handleRenderCell={renderCell}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Box>
    </PageContainer>
  );
}
