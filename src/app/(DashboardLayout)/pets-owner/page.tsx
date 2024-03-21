"use client";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";

import Modal from "@/components/modal";
import { useDispatch, useSelector } from "@/store/hooks";
import { addDoctor, DeleteDoctor, GetDoctorList, UpdateDoctor } from "@/store/slice/doctor";
import { modalPetOwnerFields, modalPetOwnerTitle } from "@/utils/data/modal";
import { PetOwnerType, PaginationType } from "@/utils/types/table";
import { petOwnerCells, petOwnerColumns } from "@/utils/data/table";
import PageContainer from "@/components/container/PageContainer";
import CustomTable from "@/components/custom-table";
import { ModalMod } from "@/utils/enum/modal";


export default function PetOwner() {
  const [isModal, setIsModal] = useState<boolean>(false);
  const pagination: PaginationType = useSelector((state) => state.petOwnerReducer.petOwnerPagination)
  const PetOwners: PetOwnerType[] = useSelector((state) => state.petOwnerReducer.petOwner)
  const dispatch = useDispatch()
  const [editPetOwner, setEditPetOwner] = useState<PetOwnerType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    status: false,
  });

  useEffect(() => {
    const fetchPetOwners = async () => {
      try {
        // const { PetOwnerList, newPagination } = await getPetOwner(pagination);
        // if (PetOwnerList) {
        //   dispatch(GetPetOwnerList({ list: PetOwnerList, newPagination }))
        // }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPetOwners();
  }, []);

  const handleToggle = () => {
    setIsModal(!isModal);

    if (editPetOwner.status) {
      setEditPetOwner({
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
      // const { PetOwner } = await postPetOwner(values);
      // if (PetOwner) {
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
      // const { PetOwner } = await patchPetOwner(values);
      // if (PetOwner) {
      dispatch(UpdateDoctor(values))
      //   setEditPetOwner({
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
      // const { PetOwner } = await deletePetOwner(id);
      // if (PetOwner) {
      dispatch(DeleteDoctor(id))
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id: string) => {
    const PetOwner: (PetOwnerType | undefined) = PetOwners?.find((perm: any) => perm._id === id);

    if (PetOwner) {
      setIsModal(true);
      setEditPetOwner({
        id: PetOwner._id,
        firstName: PetOwner.firstName,
        lastName: PetOwner.lastName,
        email: PetOwner.email,
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
    PetOwner: any,
    newValue: string,
    fieldAlias: string,
    setValues: any,
  ) => {
    setValues({
      ...PetOwner,
      [fieldAlias]: newValue,
    });
  };

  const handleChangePage = async (evt: any, value: number) => {
    try {
      // const { performanceList, newPagination } = await getPetOwner({ ...pagination, page: value });
      // dispatch(GetPetOwnerList({ performanceList, newPagination }))
    } catch (error) {
      console.log(error);
    }
  }

  const handleChangeRowsPerPage = async (evt: any) => {
    try {
      // const { performanceList, newPagination } = await getPetOwner({ ...pagination, rowsPerPage: parseInt(evt.target.value) });
      // dispatch(GetPetOwnerList({ performanceList, newPagination }))
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PageContainer title="PetOwner" description="This is PetOwner ">
      <Box mt={3}>
        <CustomTable
          title={"PetOwner"}
          rows={PetOwners}
          columns={petOwnerColumns}
          cells={petOwnerCells}
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
            handleSubmit={editPetOwner.status ? handleUpdate : handleAdd}
            handleToggle={handleToggle}
            handleModalFieldOnChange={handleModalFieldOnChange}
            editData={editPetOwner}
            modalFields={modalPetOwnerFields}
            isModal={isModal}
            title={
              editPetOwner.status
                ? modalPetOwnerTitle[ModalMod.EDIT]
                : modalPetOwnerTitle[ModalMod.NEW]
            }
          />
        )}
      </Box>
    </PageContainer>
  );
}
