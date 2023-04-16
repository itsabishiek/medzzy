import React from "react";
import { Stack, Box, CircularProgress, IconButton } from "@mui/material";
import { DataGrid, GridRenderCellParams, GridToolbar } from "@mui/x-data-grid";
import Link from "next/link";
import { Delete, Preview } from "@mui/icons-material";
import { userColumns } from "../../utils/datatablesrc";

type DataTableProps = {};

const DataTable: React.FC<DataTableProps> = () => {
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
