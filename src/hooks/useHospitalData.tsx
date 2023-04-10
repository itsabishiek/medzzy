import { useRecoilState } from "recoil";
import { HospitalData, hospitalDataState } from "../atoms/hospitalDataAtom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/clientApp";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";

const useHospitalData = () => {
  const [user] = useAuthState(auth);
  const [hospitalStateValue, setHospitalStateValue] =
    useRecoilState(hospitalDataState);
  const [loading, setLoading] = useState(false);

  const getHospitalData = async (user: User) => {
    setLoading(true);
    try {
      const hospitalQ = query(
        collection(firestore, "hospitals"),
        where("uid", "==", user.uid)
      );
      const hospitalDoc = await getDocs(hospitalQ);
      const hospitalData = hospitalDoc.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHospitalStateValue((prev) => ({
        ...prev,
        hospitalData: hospitalData[0] as HospitalData,
      }));
    } catch (error) {
      console.log("useHospitalData Error", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      getHospitalData(user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid]);

  return {
    hospitalStateValue,
    setHospitalStateValue,
    loading,
  };
};

export default useHospitalData;
