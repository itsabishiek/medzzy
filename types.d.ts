export type PatientDetails = {
  id: string;
  fullname: string;
  phone: string;
  email: string;
  age: string;
  gender: string;
  bloodGroup: string;
  height: string;
  weight: string;
  dob: string;
  patientType: string;
  symptoms: string;
  prescribedMed: string;
  address: string;
  addInfo: string;
  highPres: boolean;
  lowPres: boolean;
  diabetic: boolean;
  smoker: boolean;
};

export type DoctorDetails = {
  id: string;
  fullname: string;
  phone: string;
  email: string;
  age: string;
  gender: string;
  bloodGroup: string;
  dob: string;
  department: string;
  medDegree: string;
  speciality: string;
  address: string;
  addInfo: string;
};

export type PatientMiscellaneous = {
  prescriptionDate: string;
  symptoms: string;
  prescribedMed: string;
  vitalsDate: string;
  bodyTemp: string;
  heartRate: string;
  respiratoryRate: string;
  bloodPressure: string;
};
