export interface Driver {
    id: number;
    status: string;
    latitude: number;
    longitude: number;
    fullName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    available: boolean;
    password: string;
    profilePictureUrl: string;
    role: string;
    vehicleType: string;
    vehicleModel: string;
    vehicleRegistrationNumber: string;
    vehicleMake: string;
    insuranceDetails: string;
    licenseNumber: string;
    licenseClass: string;
    drivingExperience: number;
    criminalBackgroundCheck: boolean;
    mpesaNumber: string;
    bankAccountDetails: string;
    paymentPreference: string;
    termsAndConditionsAgreed: boolean;
  }
  