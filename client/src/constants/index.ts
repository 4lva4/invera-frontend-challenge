import { UserType } from "@/enums/index.enum";

export const USER_CHART_COLORS: Record<UserType, string> = {
  [UserType.ORGANIC]: '#7c94ff',
  [UserType.SOCIAL]: '#ffffff',
  [UserType.DIRECT]: '#4ade80',
};