export interface Client {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string; // Use string or Date if you'd like to work with dates
    city: string;
    lastLoginTime: string; // Can also be Date if you're converting it later
    active: boolean;
  }
  