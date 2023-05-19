import { Delete, Preview } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  IconButton,
  Stack,
  Tab,
  Tabs,
} from "@mui/material";
import { DataGrid, GridRenderCellParams, GridToolbar } from "@mui/x-data-grid";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  patientPresTabColumn,
  patientVitalTabColumn,
} from "../../../utils/datatablesrc";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { firestore } from "../../../firebase/clientApp";
import { useRouter } from "next/router";
import useHospitalData from "../../../hooks/useHospitalData";
import DeleteModal from "../../modals/DeleteModal";

type PatientTabsProps = {};

const PatientTabs: React.FC<PatientTabsProps> = () => {
  const { patientId } = useRouter().query;
  const { hospitalStateValue } = useHospitalData();
  const hospitalData = hospitalStateValue.hospitalData;
  const [value, setValue] = useState(0);
  const [miscellaneous, setMiscellaneous] = useState<{ id: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <>
            <Stack flexDirection="row" gap="10px">
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
      const miscellaneousRef = doc(
        firestore,
        `/hospitals/${hospitalData?.username}/patients/${patientId}/miscellaneous/${id}`
      );
      await deleteDoc(miscellaneousRef);
      setMiscellaneous(miscellaneous.filter((item) => item.id !== id));
      setLoading(false);
    } catch (error) {
      console.log("handleDelete Error", error);
    }
  };

  const getMiscellaneousDetails = async () => {
    try {
      const editPatientTabQ = query(
        collection(
          firestore,
          `/hospitals/${hospitalData?.username}/patients/${patientId}/miscellaneous`
        ),
        orderBy("createdAt", "desc")
      );
      const miscellaneousDocs = await getDocs(editPatientTabQ);
      const miscellaneous = miscellaneousDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMiscellaneous(miscellaneous);
    } catch (error) {
      console.log("getMiscellaneousDetails Error", error);
    }
  };

  useEffect(() => {
    getMiscellaneousDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box width="100%">
      <Tabs
        sx={{ width: "100%", margin: "30px 0px" }}
        value={value}
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab label="Prescription" sx={{ width: "33.3%" }} />
        <Tab label="Vitals" sx={{ width: "33.3%" }} />
        <Tab label="Lab records" sx={{ width: "33.3%" }} />
      </Tabs>

      {value === 0 && (
        <Box sx={{ height: "350px", width: "100%" }}>
          <DataGrid
            components={{
              Toolbar: GridToolbar,
              NoRowsOverlay: () => (
                <Stack
                  height="100%"
                  alignItems="center"
                  justifyContent="center"
                >
                  <CircularProgress color="inherit" />
                </Stack>
              ),
              NoResultsOverlay: () => (
                <Stack
                  height="100%"
                  alignItems="center"
                  justifyContent="center"
                >
                  No results found!
                </Stack>
              ),
            }}
            rows={miscellaneous}
            columns={patientPresTabColumn.concat(actionColumn)}
            checkboxSelection
            pagination
            pageSizeOptions={[5]}
          />
        </Box>
      )}
      {value === 1 && (
        <Box sx={{ height: "350px", width: "100%" }}>
          <DataGrid
            components={{
              Toolbar: GridToolbar,
              NoRowsOverlay: () => (
                <Stack
                  height="100%"
                  alignItems="center"
                  justifyContent="center"
                >
                  <CircularProgress color="inherit" />
                </Stack>
              ),
              NoResultsOverlay: () => (
                <Stack
                  height="100%"
                  alignItems="center"
                  justifyContent="center"
                >
                  No results found!
                </Stack>
              ),
            }}
            rows={miscellaneous}
            columns={patientVitalTabColumn}
            checkboxSelection
            pagination
            pageSizeOptions={[5]}
          />
        </Box>
      )}
      {value === 2 && <h1>Lab records</h1>}
    </Box>
  );
};
export default PatientTabs;
