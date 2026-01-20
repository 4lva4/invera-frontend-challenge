import { User } from "@/types";
import { UserCategory, UserStatus, UserType } from "@/enums/index.enum";

export const mapUserAdapter = (user: User): User => {
  return {
    id: user.id,
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    company: user.company || '',
    location: user.location || '',
    status: user.status || UserStatus.ONLINE,
    category: user.category || UserCategory.TOP,
    type: user.type || UserType.SOCIAL,
  };
};
