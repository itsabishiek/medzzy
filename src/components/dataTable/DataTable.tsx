import React from "react";
import {
  Stack,
  Box,
  CircularProgress,
  Button,
  Icon,
  IconButton,
} from "@mui/material";
import { DataGrid, GridRenderCellParams, GridToolbar } from "@mui/x-data-grid";
import Link from "next/link";
import { Delete, Preview } from "@mui/icons-material";

type DataTableProps = {};

const DataTable: React.FC<DataTableProps> = () => {
  const userColumns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "fullname",
      headerName: "Patient Name",
      width: 200,
    },
    {
      field: "age",
      headerName: "Age",
      width: 100,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 180,
    },
    {
      field: "bloodGroup",
      headerName: "Blood Group",
      width: 140,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 100,
    },
  ];

  const patients = [
    {
      id: "kdkfhwkds",
      fullname: "Raj Mohan",
      age: 18,
      phone: "9734857933",
      bloodGroup: "O +ve",
      gender: "Male",
    },
    {
      id: "fghfghghdfh",
      fullname: "Chandar",
      age: 18,
      phone: "9734857933",
      bloodGroup: "O +ve",
      gender: "Male",
    },
    {
      id: "dfgsfdfddf",
      fullname: "John Doe",
      age: 18,
      phone: "9734857933",
      bloodGroup: "O +ve",
      gender: "Male",
    },
  ];

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
                >
                  <Preview />
                </IconButton>
              </Link>

              <IconButton
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
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

  return (
    <Stack>
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
