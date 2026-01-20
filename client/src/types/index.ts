import { UserCategory, UserStatus, UserType } from "@/enums/index.enum";

export interface Statics {
  totalUsers: number;
  newUsers: number;
  topUsers: number;
  otherUsers: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  type?: UserType;
  category: UserCategory;
  status: UserStatus;
  company: string;
  location: string;
  phone: string;
}

export interface UserDistribution {
  type: UserType;
  percentage: number;
}

export interface UserTypesData {
  totalUsers: number;
  distribution: UserDistribution[];
}

export interface SortConfig {
  key: string;
  order: 'asc' | 'desc';
}
export { UserStatus, UserType, UserCategory };

