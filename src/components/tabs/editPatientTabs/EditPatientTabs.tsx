import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { firestore } from "../../../firebase/clientApp";
import useHospitalData from "../../../hooks/useHospitalData";
import { useRouter } from "next/router";

type PatientTabsProps = {
  handleClose: () => void;
};

const PatientTabs: React.FC<PatientTabsProps> = ({ handleClose }) => {
  const { patientId } = useRouter().query;
  const { hospitalStateValue } = useHospitalData();
  const hospitalData = hospitalStateValue.hospitalData;
  const [value, setValue] = useState(0);
  const [formInput, setFormInput] = useState({
    prescriptionDate: "",
    symptoms: "",
    prescribedMed: "",
    vitalsDate: "",
    bodyTemp: "",
    heartRate: "",
    respiratoryRate: "",
    bloodPressure: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [focus, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setFormInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (formInput.prescriptionDate !== "") {
      setHasValue(true);
    } else {
      setHasValue(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const editPatientTabRef = collection(
        firestore,
        `/hospitals/${hospitalData?.username}/patients/${patientId}/miscellaneous`
      );
      await addDoc(editPatientTabRef, {
        ...formInput,
        createdAt: serverTimestamp(),
      });
      setLoading(false);
      router.push(`/patient/${patientId}`);
      handleClose();
    } catch (error) {
      console.log("handleSubmit Error", error);
    }
  };

  return (
    <Box width="100%">
      <Tabs
        sx={{ width: "100%", margin: "30px 0px" }}
        value={value}
        onChange={handleTabChange}
        aria-label="disabled tabs example"
      >
        <Tab label="Prescription" sx={{ width: "33.3%" }} />
        <Tab label="Vitals" sx={{ width: "33.3%" }} />
        <Tab label="Lab records" sx={{ width: "33.3%" }} />
      </Tabs>

      {value === 0 && (
        <Stack
          sx={{
            height: "max-content",
            width: "100%",
            padding: "0px 15px",
            gap: "25px",
          }}
        >
          <TextField
            onFocus={onFocus}
            onBlur={onBlur}
            fullWidth
            type={hasValue || focus ? "date" : "text"}
            label="Date"
            name="prescriptionDate"
            value={formInput.prescriptionDate}
            onChange={handleChange}
          />

          <TextField
            type="text"
            label="Symptoms"
            name="symptoms"
            placeholder="Symptoms"
            value={formInput.symptoms}
            onChange={handleChange}
          />

          <TextField
            type="text"
            label="Prescribed Medicines"
            name="prescribedMed"
            placeholder="Prescribed Medicines"
            value={formInput.prescribedMed}
            onChange={handleChange}
          />
        </Stack>
      )}
      {value === 1 && (
        <Stack
          sx={{
            height: "max-content",
            width: "100%",
            padding: "0px 15px",
            gap: "25px",
          }}
        >
          <TextField
            type="text"
            label="Body Temperature"
            name="bodyTemp"
            placeholder="Body Temperature"
            value={formInput.bodyTemp}
            onChange={handleChange}
          />

          <TextField
            type="text"
            label="Heart Rate/Pulse"
            name="heartRate"
            placeholder="Heart Rate/Pulse"
            value={formInput.heartRate}
            onChange={handleChange}
          />

          <TextField
            type="text"
            label="Respiratory Rate"
            name="respiratoryRate"
            placeholder="Respiratory Rate"
            value={formInput.respiratoryRate}
            onChange={handleChange}
          />

          <TextField
            type="text"
            label="Blood Pressure"
            name="bloodPressure"
            placeholder="Blood Pressure"
            value={formInput.bloodPressure}
            onChange={handleChange}
          />

          <TextField
            onFocus={onFocus}
            onBlur={onBlur}
            fullWidth
            type={hasValue || focus ? "date" : "text"}
            label="Date Recorded"
            name="vitalsDate"
            value={formInput.vitalsDate}
            onChange={handleChange}
          />
        </Stack>
      )}
      {value === 2 && (
        <Box sx={{ height: "300px", width: "100%", padding: "0px 15px" }}>
          Lab records
        </Box>
      )}

      <Box sx={{ float: "right", padding: "20px" }}>
        <Button onClick={handleClose} size="small" sx={{ color: "#eee" }}>
          Cancel
        </Button>
        <Button
          autoFocus
          variant="contained"
          size="small"
          onClick={handleSubmit}
        >
          {loading ? <CircularProgress color="inherit" size={15} /> : "Submit"}
        </Button>
      </Box>
    </Box>
  );
};
export default PatientTabs;
