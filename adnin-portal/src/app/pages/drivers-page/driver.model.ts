export interface Driver {
    id: number;
    status: string;
    latitude: number;
    serviceName: string;
    longitude: number;
    active: boolean;
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
    insuranceDetailsUrl: string;
    licenseNumber: string;
    licenseClass: string;
    drivingExperience: number;
    criminalBackgroundCheckUrl: string;
    mpesaNumber: string;
    bankAccountDetails: string;
    paymentPreference: string;
    termsAndConditionsAgreed: boolean;
}

  