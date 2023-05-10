import {
  Button,
  CircularProgress,
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

type NewDoctorProps = {};

const NewDoctor: React.FC<NewDoctorProps> = () => {
  const { hospitalStateValue } = useHospitalData();
  const hospitalData = hospitalStateValue.hospitalData;
  const [formInput, setFormInput] = useState({
    fullname: "",
    phone: "",
    email: "",
    age: "",
    gender: "",
    bloodGroup: "",
    dob: "",
    department: "",
    medDegree: "",
    speciality: "",
    address: "",
    addInfo: "",
  });
  const [loading, setLoading] = useState(false);

  const [focus, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      const newDoctorRef = collection(
        firestore,
        `/hospitals/${hospitalData?.username}/doctors`
      );
      await addDoc(newDoctorRef, {
        ...formInput,
        createdAt: serverTimestamp(),
      });
      router.push(`/doctors`);
      setLoading(true);
    } catch (error) {
      console.log("handleSubmit Error", error);
    }
  };

  // console.log(formInput);

  return (
    <>
      <Head>
        <title>Create new Doctor - Medzzy!</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/img/logo.svg" />
      </Head>

      <Stack margin="30px 0px">
        <Stack flexDirection="row">
          <form className="form" onSubmit={handleSubmit}>
            <TextField
              type="text"
              label="Doctor's Name"
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
              onFocus={onFocus}
              onBlur={onBlur}
              type={hasValue || focus ? "date" : "text"}
              label="Date of birth"
              name="dob"
              className="formInput"
              onChange={handleChange}
            />
            <TextField
              type="text"
              label="Department"
              name="department"
              placeholder="Department"
              className="formInput"
              onChange={handleChange}
            />

            <TextField
              type="text"
              label="Medical Degree"
              name="medDegree"
              placeholder="Medical Degree"
              multiline
              rows={3}
              className="formInput"
              onChange={handleChange}
            />
            <TextField
              type="text"
              label="Speciality"
              name="speciality"
              placeholder="Speciality"
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
export default NewDoctor;
