export interface Step1Data { 
  username: string; 
  password: string; 
  email: string; 
  phone: string; 
}
export interface Step2Data { 
  birthdate: string; 
  gender: "male" | "female" | "other"; 
  interests?: string[] 
}
export interface Step3Data { 
  twitter?: string; 
  instagram?: string 
  
}
export type SignupFormData = Step1Data & Step2Data & Step3Data;