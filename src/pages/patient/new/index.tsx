import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import Head from "next/head";
import React, { useState } from "react";
import { firestore } from "../../../firebase/clientApp";
import useHospitalData from "../../../hooks/useHospitalData";
import { useRouter } from "next/router";

type NewPatientProps = {};

const NewPatient: React.FC<NewPatientProps> = () => {
  const { hospitalStateValue } = useHospitalData();
  const hospitalData = hospitalStateValue.hospitalData;
  const [formInput, setFormInput] = useState({
    fullname: "",
    phone: "",
    email: "",
    age: "",
    gender: "",
    bloodGroup: "",
    height: "",
    weight: "",
    dob: "",
    patientType: "",
    symptoms: "",
    prescribedMed: "",
    address: "",
    addInfo: "",
  });
  const [highPres, setHighPres] = useState(false);
  const [lowPres, setLowPres] = useState(false);
  const [diabetic, setDiabetic] = useState(false);
  const [smoker, setSmoker] = useState(false);

  const [focus, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setFormInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (formInput.dob !== "") {
      setHasValue(true);
    } else {
      setHasValue(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const newPatientRef = collection(
        firestore,
        `/hospitals/${hospitalData?.username}/patients`
      );
      await addDoc(newPatientRef, {
        ...formInput,
        highPres,
        lowPres,
        diabetic,
        smoker,
        createdAt: serverTimestamp(),
      });
      router.push("/patients");
      setLoading(false);
    } catch (error) {
      console.log("handleSubmit Error", error);
    }
  };

  // console.log(formInput);

  return (
    <>
      <Head>
        <title>Create new Patient - Medzzy!</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/img/logo.png" />
      </Head>

      <Stack margin="30px 0px">
        <Stack flexDirection="row">
          <form className="form" onSubmit={handleSubmit}>
            <TextField
              type="text"
              label="Patient's Name"
              name="fullname"
              placeholder="Patient's Name"
              className="formInput"
              onChange={handleChange}
            />
            <TextField
              type="text"
              label="Phone number"
              name="phone"
              placeholder="Phone number"
              className="formInput"
              onChange={handleChange}
            />
            <TextField
              type="email"
              label="Email"
              name="email"
              placeholder="Email"
              className="formInput"
              onChange={handleChange}
            />
            <TextField
              type="text"
              label="Age"
              name="age"
              placeholder="Age"
              className="formInput"
              onChange={handleChange}
            />

            <TextField
              select
              type="text"
              label="Gender"
              name="gender"
              placeholder="Gender"
              className="formInput"
              onChange={handleChange}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Others">Others</MenuItem>
            </TextField>

            <TextField
              select
              type="text"
              label="Blood group"
              name="bloodGroup"
              placeholder="Blood group"
              className="formInput"
              onChange={handleChange}
            >
              <MenuItem value="O +ve">O +ve</MenuItem>
              <MenuItem value="O -ve">O -ve</MenuItem>
              <MenuItem value="A +ve">A +ve</MenuItem>
              <MenuItem value="A -ve">A -ve</MenuItem>
              <MenuItem value="B +ve">B +ve</MenuItem>
              <MenuItem value="B -ve">B -ve</MenuItem>
              <MenuItem value="AB +ve">AB +ve</MenuItem>
              <MenuItem value="AB -ve">AB -ve</MenuItem>
            </TextField>

            <TextField
              type="text"
              label="Height"
              name="height"
              placeholder="Height"
              className="formInput"
              onChange={handleChange}
            />
            <TextField
              type="text"
              label="Weight"
              name="weight"
              placeholder="Weight"
              className="formInput"
              onChange={handleChange}
            />

            <TextField
              onFocus={onFocus}
              onBlur={onBlur}
              type={hasValue || focus ? "date" : "text"}
              label="Date of birth"
              name="dob"
              className="formInput"
              onChange={handleChange}
            />

            <TextField
              select
              type="text"
              label="Patient type"
              name="patientType"
              placeholder="Patient type"
              className="formInput"
              onChange={handleChange}
            >
              <MenuItem value="Male">In Patient</MenuItem>
              <MenuItem value="Female">Out Patient</MenuItem>
            </TextField>

            <TextField
              type="text"
              label="Symptoms"
              name="symptoms"
              placeholder="Symptoms"
              multiline
              rows={3}
              className="formInput"
              onChange={handleChange}
            />
            <TextField
              type="text"
              label="Prescribed Medicines"
              name="prescribedMed"
              placeholder="Prescribed Medicines"
              multiline
              rows={3}
              className="formInput"
              onChange={handleChange}
            />
            <TextField
              type="text"
              label="Address"
              name="address"
              placeholder="Address"
              multiline
              rows={3}
              className="formInput"
              onChange={handleChange}
            />
            <TextField
              type="text"
              label="Additional Info"
              name="addInfo"
              placeholder="Additional Info"
              multiline
              rows={3}
              className="formInput"
              onChange={handleChange}
            />

            <Stack
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
              flexWrap="wrap"
              margin="10px 0px"
            >
              <FormControlLabel
                control={
                  <Checkbox
                    name="highPres"
                    checked={highPres}
                    onChange={(e) => setHighPres(e.target.checked)}
                  />
                }
                label="High Pressure"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="lowPres"
                    checked={lowPres}
                    onChange={(e) => setLowPres(e.target.checked)}
                  />
                }
                label="Low Pressure"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="diabetic"
                    checked={diabetic}
                    onChange={(e) => setDiabetic(e.target.checked)}
                  />
                }
                label="Diabetic"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="smoker"
                    checked={smoker}
                    onChange={(e) => setSmoker(e.target.checked)}
                  />
                }
                label="Smoker"
              />
            </Stack>

            <Button
              sx={{
                backgroundImage: "var(--bg-gradient)",
                color: "white",
                fontWeight: 600,
                borderRadius: "25px",
                padding: "8px 40px",
                marginTop: "15px",
              }}
              type="submit"
            >
              {loading ? (
                <CircularProgress
                  color="inherit"
                  size="20px"
                  sx={{ margin: "0px 20px" }}
                />
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Stack>
      </Stack>
    </>
  );
};
export default NewPatient;
