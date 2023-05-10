import {
  Backdrop,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import useHospitalData from "../../../../hooks/useHospitalData";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { firestore } from "../../../../firebase/clientApp";
import { useRouter } from "next/router";
import { DoctorDetails } from "../../../../../types";

type EditDoctorDetailsProps = {};

const EditDoctorDetails: React.FC<EditDoctorDetailsProps> = () => {
  const { hospitalStateValue } = useHospitalData();
  const hospitalData = hospitalStateValue.hospitalData;
  const { doctorId } = useRouter().query;
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
  const [doctorDetails, setDoctorDetails] = useState<DoctorDetails>();
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const getDoctorDetails = async () => {
    try {
      setFetching(true);
      const doctorDocRef = doc(
        firestore,
        `/hospitals/${hospitalData?.username}/doctors/${doctorId}`
      );
      const doctorDetails = await getDoc(doctorDocRef);

      if (doctorDetails.exists()) {
        setDoctorDetails({
          id: doctorDetails.id,
          ...doctorDetails.data(),
        } as DoctorDetails);
      } else {
        console.log("No such document!");
      }
      setFetching(false);
    } catch (error) {
      console.log("getDoctorDetails Error", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const doctorDocRef = doc(
        firestore,
        `/hospitals/${hospitalData?.username}/doctors/${doctorId}`
      );
      await updateDoc(doctorDocRef, {
        ...formInput,
        createdAt: serverTimestamp(),
      });

      router.push(`/doctor/${doctorId}`);
      setLoading(false);
    } catch (error) {
      console.log("handleEditSubmit Error", error);
    }
  };

  useEffect(() => {
    getDoctorDetails();
    setFormInput((prev) => ({
      ...prev,
      fullname: doctorDetails?.fullname!,
      phone: doctorDetails?.phone!,
      email: doctorDetails?.email!,
      age: doctorDetails?.age!,
      gender: doctorDetails?.gender!,
      bloodGroup: doctorDetails?.bloodGroup!,
      dob: doctorDetails?.dob!,
      department: doctorDetails?.department!,
      medDegree: doctorDetails?.medDegree!,
      speciality: doctorDetails?.speciality!,
      address: doctorDetails?.address!,
      addInfo: doctorDetails?.addInfo!,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doctorId, doctorDetails?.id]);

  //   console.log(doctorDetails);

  return (
    <>
      <Head>
        <title>
          Edit{" "}
          {doctorDetails?.fullname ? `${doctorDetails?.fullname}'s` : "Loading"}{" "}
          Details - Medzzy!
        </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/img/logo.svg" />
      </Head>

      {fetching && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={fetching}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}

      <Stack margin="30px 0px">
        <Stack flexDirection="row">
          <form className="form" onSubmit={handleEditSubmit}>
            <TextField
              type="text"
              label="Patient's Name"
              name="fullname"
              placeholder="Patient's Name"
              className="formInput"
              value={formInput.fullname}
              onChange={handleChange}
            />
            <TextField
              type="text"
              label="Phone number"
              name="phone"
              placeholder="Phone number"
              className="formInput"
              value={formInput.phone}
              onChange={handleChange}
            />
            <TextField
              type="email"
              label="Email"
              name="email"
              placeholder="Email"
              className="formInput"
              value={formInput.email}
              onChange={handleChange}
            />
            <TextField
              type="text"
              label="Age"
              name="age"
              placeholder="Age"
              className="formInput"
              value={formInput.age}
              onChange={handleChange}
            />

            <TextField
              select
              type="text"
              label="Gender"
              name="gender"
              placeholder="Gender"
              className="formInput"
              value={formInput.gender}
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
              value={formInput.bloodGroup}
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
              type="date"
              label="Date of birth"
              name="dob"
              placeholder="Date of birth"
              className="formInput"
              value={formInput.dob}
              onChange={handleChange}
            />
            <TextField
              type="text"
              label="Department"
              name="department"
              placeholder="Department"
              className="formInput"
              value={formInput.department}
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
              value={formInput.medDegree}
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
              value={formInput.speciality}
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
              value={formInput.address}
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
              value={formInput.addInfo}
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
export default EditDoctorDetails;
