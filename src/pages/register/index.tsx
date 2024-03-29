import {
  Typography,
  Stack,
  Avatar,
  Icon,
  TextField,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import Head from "next/head";
import Link from "next/link";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import React, { useEffect, useRef, useState } from "react";
import { auth, firestore, storage } from "../../firebase/clientApp";
import { FIREBASE_ERRORS } from "../../firebase/errors";
import { User } from "firebase/auth";
import { doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import useSelectedFile from "../../hooks/useSelectedFile";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import Image from "next/image";

type RegisterProps = {};

const Register: React.FC<RegisterProps> = () => {
  const [registerForm, setRegisterForm] = useState({
    name: "",
    desc: "",
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });
  const [next, setNext] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);
  const router = useRouter();
  const selectedFileRef = useRef<HTMLInputElement>(null);

  const [createUserWithEmailAndPassword, user, userLoading, userError] =
    useCreateUserWithEmailAndPassword(auth);
  const { selectedFile, setSelectedFile, handleSelectFile } = useSelectedFile();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (registerForm.password === registerForm.confirmPassword) {
      createUserWithEmailAndPassword(registerForm.email, registerForm.password);
    } else {
      setError("Passwords do not match.");
      return;
    }

    setNext(true);
  };

  const createHospitalCol = async (user: User) => {
    setLoading(true);
    try {
      await setDoc(doc(firestore, "/hospitals", registerForm.username), {
        uid: user.uid,
        name: registerForm.name,
        username: registerForm.username,
        desc: registerForm.desc,
        email: registerForm.email,
        createdAt: serverTimestamp(),
      });

      if (selectedFile) {
        const imageRef = ref(
          storage,
          `/hospitals/${registerForm.username}/image`
        );
        await uploadString(imageRef, selectedFile, "data_url");
        const downloadURL = await getDownloadURL(imageRef);

        await updateDoc(doc(firestore, "/hospitals", registerForm.username), {
          imageURL: downloadURL,
        });
      }

      setSelectedFile("");
      router.push("/dashboard");
    } catch (error) {
      console.log("createHospitalCol", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user && submit) {
      createHospitalCol(user.user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, submit]);

  console.log(selectedFile);

  return (
    <>
      <Head>
        <title>Register - Medzzy!</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/img/logo.png" />
      </Head>

      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        gap="15px"
      >
        <Stack padding="0 35px">
          {!next && (
            <form onSubmit={handleSubmit}>
              <Stack
                alignItems="center"
                width={{ xs: "100%", md: "450px" }}
                gap="20px"
                margin="0px auto"
              >
                <Typography fontWeight={600} fontSize="28px" color="brand.100">
                  Register
                </Typography>

                <TextField
                  type="text"
                  name="name"
                  placeholder="Hospital Name"
                  sx={{
                    height: "50px",
                    width: "100%",
                    "&:focus": { border: "1px solid #27c399" },
                  }}
                  onChange={handleChange}
                />

                <TextField
                  type="text"
                  name="desc"
                  placeholder="Description"
                  sx={{
                    height: "50px",
                    width: "100%",
                    "&:focus": { border: "1px solid #27c399" },
                  }}
                  onChange={handleChange}
                />

                <Box width="100%">
                  <TextField
                    type="email"
                    name="email"
                    placeholder="Email"
                    sx={{
                      height: "50px",
                      width: "100%",
                      "&:focus": { border: "1px solid #27c399" },
                    }}
                    onChange={handleChange}
                  />
                  <Typography
                    fontSize="10pt"
                    color="gray.300"
                    padding="10px 5px"
                    pb={0}
                  >
                    Enter the professional email address of your hospital.
                  </Typography>
                </Box>

                <TextField
                  type="password"
                  name="password"
                  placeholder="Password"
                  sx={{
                    height: "50px",
                    width: "100%",
                    "&:focus": { border: "1px solid #27c399" },
                  }}
                  onChange={handleChange}
                />

                <TextField
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  sx={{
                    height: "50px",
                    width: "100%",
                    "&:focus": { border: "1px solid #27c399" },
                  }}
                  onChange={handleChange}
                />

                <Stack flexDirection="row" alignItems="center" gap="5px" mt={1}>
                  <Typography>Already have an account?</Typography>
                  <Link href="/login">
                    <Typography color="var(--accent-color)" fontWeight={500}>
                      Login
                    </Typography>
                  </Link>
                </Stack>

                {(error || userError) && (
                  <Typography fontSize="11pt" color="red.200">
                    {error}
                    {
                      FIREBASE_ERRORS[
                        userError?.message as keyof typeof FIREBASE_ERRORS
                      ]
                    }
                  </Typography>
                )}

                <Button type="submit" fullWidth variant="contained">
                  {userLoading ? (
                    <CircularProgress color="inherit" size="25px" />
                  ) : (
                    "Register"
                  )}
                </Button>
              </Stack>
            </form>
          )}

          {next && (
            <Stack
              alignItems="center"
              width={{ xs: "100%", md: "450px" }}
              margin="0px auto"
              gap="20px"
            >
              <Typography fontWeight={600} fontSize="28px" color="brand.100">
                Set a Unique name
              </Typography>

              <Stack
                flexDirection="row"
                alignItems="center"
                width="100%"
                gap="20px"
                position="relative"
              >
                {!selectedFile ? (
                  <>
                    <Avatar
                      src=""
                      sx={{
                        width: "56px",
                        height: "56px",
                        cursor: "pointer",
                      }}
                      onClick={() => selectedFileRef?.current?.click()}
                    />
                    <Icon
                      sx={{
                        position: "absolute",
                        top: "0px",
                        left: "40px",
                        borderRadius: "50%",
                        bgcolor: "brand.100",
                        padding: "2px",
                      }}
                    >
                      <Add
                        sx={{ width: "4px", height: "4px", color: "white" }}
                      />
                    </Icon>
                  </>
                ) : (
                  <Avatar
                    src={selectedFile}
                    sx={{ width: "56px", height: "56px" }}
                  />
                )}
                <input
                  id="file-upload"
                  type="file"
                  accept="image/x-png,image/gif,image/jpeg,image/jpg,image/png"
                  hidden
                  ref={selectedFileRef}
                  onChange={handleSelectFile}
                />
                <Stack>
                  <Typography>{registerForm.name}</Typography>
                  <Typography fontSize="10pt" color="gray.300" pb={0}>
                    Add your hospital logo here.
                  </Typography>
                </Stack>
              </Stack>
              <Box width="100%">
                <TextField
                  type="text"
                  name="username"
                  placeholder="Hospital Username (e.g. healthcare)"
                  sx={{
                    height: "50px",
                    width: "100%",
                    "&:focus": { border: "1px solid #27c399" },
                  }}
                  onChange={handleChange}
                />
                <Typography
                  fontSize="10pt"
                  color="var(--text-sec)"
                  padding="10px 5px"
                  pb={0}
                >
                  Enter username for your Hospital.
                </Typography>
              </Box>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                onClick={() => setSubmit(true)}
              >
                {loading ? (
                  <CircularProgress color="inherit" size="25px" />
                ) : (
                  "Submit"
                )}
              </Button>
            </Stack>
          )}
        </Stack>
      </Stack>
    </>
  );
};
export default Register;
