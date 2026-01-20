import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserIdentityProps {
  name: string;
  email: string;
}

export const UserIdentity = React.memo(({ name, email }: UserIdentityProps) => {
  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-10 w-10 border border-white/10">
        <AvatarImage src={`https://i.pravatar.cc/150?u=${email}`} alt={name} />
        <AvatarFallback className="bg-[#1e1e1e] text-xs text-gray-400">
          {name.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col min-w-0">
        <span className="text-sm font-medium text-neutral-900 dark:text-neutral-300  truncate">{name}</span>
        <span className="text-xs text-neutral-900 dark:text-neutral-300  truncate">{email}</span>
      </div>
    </div>
  );
});

UserIdentity.displayName = 'UserIdentity';