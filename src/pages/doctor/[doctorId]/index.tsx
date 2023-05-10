import { Backdrop, Button, CircularProgress, Stack } from "@mui/material";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import InputCard from "../../../components/inputCard/InputCard";
import Link from "next/link";
import { useRouter } from "next/router";
import useHospitalData from "../../../hooks/useHospitalData";
import { DoctorDetails } from "../../../../types";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../../firebase/clientApp";

type DoctorDetailsProps = {};

const DoctorDetails: React.FC<DoctorDetailsProps> = () => {
  const { doctorId } = useRouter().query;
  const { hospitalStateValue } = useHospitalData();
  const hospitalData = hospitalStateValue.hospitalData;
  const [doctorDetails, setDoctorDetails] = useState<DoctorDetails>();
  const [loading, setLoading] = useState(false);

  const getDoctorDetails = async () => {
    try {
      setLoading(true);
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
      setLoading(false);
    } catch (error) {
      console.log("getDoctorDetails Error", error);
    }
  };

  useEffect(() => {
    getDoctorDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hospitalData?.username, doctorId]);

  // console.log(doctorDetails);

  return (
    <>
      <Head>
        <title>{`${
          doctorDetails?.fullname ? doctorDetails.fullname : "Loading"
        } - Medzzy!`}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/img/logo.svg" />
      </Head>

      {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}

      <Stack margin="30px 0px">
        <Stack
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          flexWrap="wrap"
          gap="20px"
          sx={{ flexDirection: { xs: "column", md: "row" } }}
        >
          <InputCard label="Doctor's Name" value={doctorDetails?.fullname!} />
          <InputCard label="Phone Number" value={doctorDetails?.phone!} />
          <InputCard label="Email" value={doctorDetails?.email!} />
          <InputCard label="Age" value={doctorDetails?.age!} />
          <InputCard label="Gender" value={doctorDetails?.gender!} />
          <InputCard label="Blood Group" value={doctorDetails?.bloodGroup!} />
          <InputCard label="Date of birth" value={doctorDetails?.dob!} />
          <InputCard label="Department" value={doctorDetails?.department!} />
          <InputCard
            label="Medical Degree"
            value={doctorDetails?.medDegree!}
            multi
          />
          <InputCard
            label="Speciality"
            value={doctorDetails?.speciality!}
            multi
          />
          <InputCard label="Address" value={doctorDetails?.address!} multi />
          <InputCard
            label="Additional Info"
            value={doctorDetails?.addInfo!}
            multi
          />
        </Stack>

        <Link href={`/doctor/${doctorId}/edit`}>
          <Button
            sx={{
              backgroundImage: "var(--bg-gradient)",
              color: "white",
              fontWeight: 600,
              borderRadius: "25px",
              padding: "8px 40px",
              marginTop: "30px",
            }}
            type="submit"
          >
            Edit Record
          </Button>
        </Link>
      </Stack>
    </>
  );
};
export default DoctorDetails;
