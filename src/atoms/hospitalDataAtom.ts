import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export type HospitalData = {
  id: string;
  uid: string;
  name: string;
  username: string;
  imageURL: string;
  desc: string;
  email: string;
  createdAt?: Timestamp;
};

interface HospitalState {
  hospitalData: HospitalData;
}

const defaultHospitalDataState: HospitalState = {
  hospitalData: {} as HospitalData,
};

export const hospitalDataState = atom({
  key: "hospitalDataState",
  default: defaultHospitalDataState,
});
