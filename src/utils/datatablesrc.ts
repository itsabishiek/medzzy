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

const patientPresTabColumn = [
  {
    field: "prescriptionDate",
    headerName: "Date",
    width: 200,
  },
  {
    field: "symptoms",
    headerName: "Symptoms",
    width: 250,
  },
  {
    field: "prescribedMed",
    headerName: "Prescribed Medicines",
    width: 300,
  },
];

const patientVitalTabColumn = [
  {
    field: "bodyTemp",
    headerName: "Body Temperature",
    width: 200,
  },
  {
    field: "heartRate",
    headerName: "Heart Rate/Pulse",
    width: 200,
  },
  {
    field: "respiratoryRate",
    headerName: "Respiratory Rate",
    width: 200,
  },
  {
    field: "bloodPressure",
    headerName: "Blood Pressure",
    width: 200,
  },
  {
    field: "vitalsDate",
    headerName: "Date Recorded",
    width: 200,
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

export {
  patientColumns,
  doctorColumns,
  patientPresTabColumn,
  patientVitalTabColumn,
};
