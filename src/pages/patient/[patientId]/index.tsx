import { Backdrop, Box, Button, CircularProgress, Stack } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import InputCard from "../../../components/inputCard/InputCard";
import Link from "next/link";
import useHospitalData from "../../../hooks/useHospitalData";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../../firebase/clientApp";
import { PatientDetails } from "../../../../types";
import PatientTabs from "../../../components/tabs/patientTabs/PatientTabs";

type PatientDetailsProps = {};

const PatientDetails: React.FC<PatientDetailsProps> = () => {
  const { patientId } = useRouter().query;
  const { hospitalStateValue } = useHospitalData();
  const hospitalData = hospitalStateValue.hospitalData;
  const [patientDetails, setPatientDetails] = useState<PatientDetails>();
  const [loading, setLoading] = useState(false);

  const getPatientDetails = async () => {
    try {
      setLoading(true);
      const patientRef = doc(
        firestore,
        `/hospitals/${hospitalData.username}/patients/${patientId}`
      );
      const patientDetails = await getDoc(patientRef);

      if (patientDetails.exists()) {
        setPatientDetails({
          id: patientDetails.id,
          ...patientDetails.data(),
        } as PatientDetails);
      } else {
        console.log("No such document!");
      }
      setLoading(false);
    } catch (error) {
      console.log("getPatientDetails Error", error);
    }
  };

  useEffect(() => {
    if (patientId) {
      getPatientDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hospitalData?.username, patientId]);

  console.log(patientDetails);

  return (
    <>
      <Head>
        <title>
          {`${
            patientDetails?.fullname ? patientDetails.fullname : "Loading"
          } - Medzzy!`}
        </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/img/logo.png" />
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
          <InputCard label="Patient's Name" value={patientDetails?.fullname!} />
          <InputCard label="Phone Number" value={patientDetails?.phone!} />
          <InputCard label="Email" value={patientDetails?.email!} />
          <InputCard label="Age" value={patientDetails?.age!} />
          <InputCard label="Height" value={patientDetails?.height!} />
          <InputCard label="Weight" value={patientDetails?.weight!} />
          <InputCard label="Gender" value={patientDetails?.gender!} />
          <InputCard label="Blood Group" value={patientDetails?.bloodGroup!} />
          <InputCard label="Symptoms" value={patientDetails?.symptoms!} multi />
          <InputCard
            label="Prescribed Medicine"
            value={patientDetails?.prescribedMed!}
            multi
          />
          <InputCard label="Address" value={patientDetails?.address!} multi />
          <InputCard
            label="Additional Info"
            value={patientDetails?.addInfo!}
            multi
          />

          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            flexWrap="wrap"
            margin="10px 0px"
            gap="15px"
          >
            <Box display="flex" alignItems="center" gap="10px">
              <input
                type="checkbox"
                style={{ width: "18px", height: "18px" }}
                checked={patientDetails?.highPres}
              />
              <label style={{ paddingBottom: 1, fontSize: 17 }}>
                High Pressure
              </label>
            </Box>

            <Box display="flex" alignItems="center" gap="10px">
              <input
                type="checkbox"
                style={{
                  width: "18px",
                  height: "18px",
                }}
                checked={patientDetails?.lowPres}
              />
              <label style={{ paddingBottom: 1, fontSize: 17 }}>
                Low Pressure
              </label>
            </Box>

            <Box display="flex" alignItems="center" gap="10px">
              <input
                type="checkbox"
                style={{ width: "18px", height: "18px" }}
                checked={patientDetails?.diabetic}
              />
              <label style={{ paddingBottom: 1, fontSize: 17 }}>Diabetic</label>
            </Box>

            <Box display="flex" alignItems="center" gap="10px">
              <input
                type="checkbox"
                style={{ width: "18px", height: "18px" }}
                checked={patientDetails?.smoker}
              />
              <label style={{ paddingBottom: 1, fontSize: 17 }}>Smoker</label>
            </Box>
          </Stack>

          <PatientTabs />

          <Link href={`/patient/${patientId}/edit`}>
            <Button
              sx={{
                backgroundImage: "var(--bg-gradient)",
                color: "white",
                fontWeight: 600,
                borderRadius: "25px",
                padding: "8px 40px",
              }}
              type="submit"
            >
              Edit Record
            </Button>
          </Link>
        </Stack>
      </Stack>
    </>
  );
};
export default PatientDetails;
