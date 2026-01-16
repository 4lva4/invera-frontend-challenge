import { UserStatus, UserType } from "@/enums/index.enum";

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
  status: UserStatus;
  date: string;
}

export interface UserDistribution {
  type: UserType;
  percentage: number;
}

export interface UserTypesData {
  totalUsers: number;
  distribution: UserDistribution[];
}

