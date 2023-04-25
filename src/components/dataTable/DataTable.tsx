import React, { useState, useEffect } from "react";
import { Stack, Box, CircularProgress, IconButton } from "@mui/material";
import { DataGrid, GridRenderCellParams, GridToolbar } from "@mui/x-data-grid";
import Link from "next/link";
import { Delete, Preview } from "@mui/icons-material";
import { userColumns } from "../../utils/datatablesrc";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { firestore } from "../../firebase/clientApp";
import useHospitalData from "../../hooks/useHospitalData";

type DataTableProps = {};

const DataTable: React.FC<DataTableProps> = () => {
  const { hospitalStateValue } = useHospitalData();
  const hospitalData = hospitalStateValue.hospitalData;
  const [patients, setPatients] = useState<{ id: string }[]>([]);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <>
            <Stack flexDirection="row" gap="10px">
              <Link href={`/patient/${params.row.id}`}>
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

              <IconButton
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                }}
                sx={{
                  backgroundImage: "var(--bg-gradient-red)",
                }}
              >
                <Delete />
              </IconButton>
            </Stack>
          </>
        );
      },
    },
  ];

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

  useEffect(() => {
    getPatients();
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
          rows={patients}
          columns={userColumns.concat(actionColumn)}
          checkboxSelection
          pagination
          pageSizeOptions={[10]}
        />
      </Box>
    </Stack>
  );
};
export default DataTable;
