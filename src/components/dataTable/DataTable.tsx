import React, { useState, useEffect } from "react";
import { Stack, Box, CircularProgress, IconButton } from "@mui/material";
import { DataGrid, GridRenderCellParams, GridToolbar } from "@mui/x-data-grid";
import Link from "next/link";
import { Delete, Preview } from "@mui/icons-material";
import { doctorColumns, patientColumns } from "../../utils/datatablesrc";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { firestore } from "../../firebase/clientApp";
import useHospitalData from "../../hooks/useHospitalData";
import DeleteModal from "../modals/DeleteModal";

type DataTableProps = {
  doctor?: boolean;
};

const DataTable: React.FC<DataTableProps> = ({ doctor }) => {
  const { hospitalStateValue } = useHospitalData();
  const hospitalData = hospitalStateValue.hospitalData;
  const [patients, setPatients] = useState<{ id: string }[]>([]);
  const [doctors, setDoctors] = useState<{ id: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <>
            <Stack flexDirection="row" gap="10px">
              <Link
                href={
                  doctor
                    ? `/doctor/${params.row.id}`
                    : `/patient/${params.row.id}`
                }
              >
                <IconButton
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                  }}
                  sx={{
                    backgroundImage: "var(--bg-gradient)",
                  }}
                >
                  <Preview />
                </IconButton>
              </Link>

              <DeleteModal
                handleDelete={handleDelete}
                id={params.row.id}
                loading={loading}
              >
                <Delete />
              </DeleteModal>
            </Stack>
          </>
        );
      },
    },
  ];

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      const patientDocRef = doc(
        firestore,
        `/hospitals/${hospitalData.username}/patients/${id}`
      );
      const doctorDocRef = doc(
        firestore,
        `hospitals/${hospitalData.username}/doctors/${id}`
      );
      await deleteDoc(doctor ? doctorDocRef : patientDocRef);

      if (doctor) {
        setDoctors(doctors.filter((doctor) => doctor.id !== id));
      } else {
        setPatients(patients.filter((patient) => patient.id !== id));
      }
      setLoading(false);
    } catch (error) {
      console.log("handleDelete Error", error);
    }
  };

  const getPatients = async () => {
    try {
      const patientsQ = query(
        collection(firestore, `/hospitals/${hospitalData.username}/patients`),
        orderBy("createdAt", "desc")
      );
      const patientsDocs = await getDocs(patientsQ);
      const patients = patientsDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPatients(patients);
    } catch (error) {
      console.log("getPatients Error", error);
    }
  };

  const getDoctors = async () => {
    try {
      const doctorQ = query(
        collection(firestore, `hospitals/${hospitalData.username}/doctors`),
        orderBy("createdAt", "desc")
      );
      const doctorDocs = await getDocs(doctorQ);
      const doctors = doctorDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDoctors(doctors);
    } catch (error) {
      console.log("getDoctors Error", error);
    }
  };

  useEffect(() => {
    getPatients();
    getDoctors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack width="100%">
      <Box sx={{ height: "500px", width: "100%", mt: "40px" }}>
        <DataGrid
          components={{
            Toolbar: GridToolbar,
            NoRowsOverlay: () => (
              <Stack height="100%" alignItems="center" justifyContent="center">
                <CircularProgress color="inherit" />
              </Stack>
            ),
            NoResultsOverlay: () => (
              <Stack height="100%" alignItems="center" justifyContent="center">
                No results found!
              </Stack>
            ),
          }}
          rows={doctor ? doctors : patients}
          columns={
            doctor
              ? doctorColumns.concat(actionColumn)
              : patientColumns.concat(actionColumn)
          }
          checkboxSelection
          pagination
          pageSizeOptions={[10]}
        />
      </Box>
    </Stack>
  );
};
export default DataTable;
