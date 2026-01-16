import { Statics, User, UserTypesData } from "@/types";
import { apiClient } from "@/utils/api-client";

export const userService = {
  getAllUsers: (signal?: AbortSignal) => 
    apiClient<User[]>('/users', { signal }),

  getStatics: (signal?: AbortSignal) => 
    apiClient<Statics>('/statics', { signal }),

  getUserTypes: (signal?: AbortSignal) => 
    apiClient<UserTypesData>('/userTypes', { signal }),
};