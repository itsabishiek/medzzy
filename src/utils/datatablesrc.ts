const patientColumns = [
  { field: "id", headerName: "ID", width: 120 },
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

const doctorColumns = [
  { field: "id", headerName: "ID", width: 120 },
  {
    field: "fullname",
    headerName: "Doctor Name",
    width: 200,
  },
  {
    field: "department",
    headerName: "Department",
    width: 180,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 180,
  },
  {
    field: "gender",
    headerName: "Gender",
    width: 140,
  },
];

export { patientColumns, doctorColumns };
