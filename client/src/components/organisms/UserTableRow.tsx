import React, { useState } from "react";
import Image from "next/image";
import { Building2 } from "lucide-react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { UserIdentity } from "../molecules/UserIdentity";
import { UserActions } from "../molecules/UserActions";
import { User } from "@/types";
import { StatusBadge } from "../molecules/StatusBadge";
import { getCompanyLogoUrl } from "@/lib/helpers";
import { UserTableSkeleton } from "./UserTableRowSkeleton";
import { useUserStore } from "@/store/useUserStore";

interface UserTableRowProps {
  user?: User;
  index: number;
  onEdit: () => void;
  isLoading?: boolean;
}

export const UserTableRow = React.memo(({ user, index, onEdit, isLoading }: UserTableRowProps) => {
  const [imageError, setImageError] = useState(false);
  
  const selectedUserIds = useUserStore((state) => state.selectedUserIds);
  const toggleUserSelection = useUserStore((state) => state.toggleUserSelection);

  if (isLoading || !user) {
    return <UserTableSkeleton index={index} />;
  }

  const logoUrl = getCompanyLogoUrl(user.company);
  const isSelected = selectedUserIds.includes(user.id);
  const isAnySelected = selectedUserIds.length > 0;

  return (
    <TableRow
      className={`border-b border-black/5 dark:border-[#1A1A1A] transition-colors hover:bg-neutral-50 dark:hover:bg-[#ffffff03] ${
        index % 2 === 0 ? "bg-white dark:bg-[#212121]" : "bg-[#EEEFF0] dark:bg-[#1A1A1A]"
      }`}
    >
      <TableCell className="w-16 pl-6 py-4">
        <Checkbox 
          checked={isSelected}
          onCheckedChange={() => toggleUserSelection(user.id)}
          className="border-neutral-300 dark:border-white/10 data-[state=checked]:bg-indigo-600 cursor-pointer" 
        />
      </TableCell>
      <TableCell className="w-[28%] py-4">
        <UserIdentity name={user.name} email={user.email} />
      </TableCell>
      <TableCell className="w-[18%] text-neutral-500 dark:text-neutral-400 font-medium text-sm py-4">
        {user.phone}
      </TableCell>
      <TableCell className="w-[16%] text-neutral-500 dark:text-neutral-400 font-medium text-sm py-4">
        {user.location}
      </TableCell>
      <TableCell className="w-[20%] py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-white/5 flex items-center justify-center border border-black/5 dark:border-white/5 shrink-0 transition-colors">
            {!imageError ? (
              <Image src={logoUrl} alt={user.company} width={18} height={18} className="object-contain" onError={() => setImageError(true)} unoptimized />
            ) : (
              <Building2 size={14} className="text-neutral-400" />
            )}
          </div>
          <span className="text-neutral-900 dark:text-neutral-200 text-sm font-semibold truncate">{user.company}</span>
        </div>
      </TableCell>
      <TableCell className="w-32 py-4">
        <StatusBadge status={user.status} />
      </TableCell>
      <TableCell className="w-20 pr-6 py-4">
        {/* Deshabilitar acciones si hay algún usuario seleccionado */}
        <div className={`flex items-center justify-end transition-opacity ${isAnySelected ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}>
          <UserActions userId={user.id} onEdit={onEdit} />
        </div>
      </TableCell>
    </TableRow>
  );
});

UserTableRow.displayName = "UserTableRow";