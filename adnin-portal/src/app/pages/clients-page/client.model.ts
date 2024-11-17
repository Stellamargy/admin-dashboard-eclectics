export interface Client {
  id: number;
  token: string;
  firstName: string;
  passwordResetOtp: string;
  activationCodeGeneratedTime: string;
  resetOtp: string;
  picturePath: string | null; // Can be a string or null
  otpGeneratedTime: string;
  lastLoginTime: string;
  activationCode: string;
  lastName: string;
  latitude: number;
  longitude: number;
  dateOfBirth: string;
  email: string;
  password: string;
  phoneNumber: string;
  city: string;
  active: boolean;
}

  