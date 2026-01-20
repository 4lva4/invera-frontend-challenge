import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { useUserStore } from "@/store/useUserStore";
import { User } from "@/types";
import { Building2, CheckSquare, MapPin, Phone, User as UserIcon } from "lucide-react";
import { SortableTableHead } from "../molecules/SortableTableHead";
import { TableToolbar } from "../molecules/TableToolbar";
import { TablePagination } from "../molecules/TablePagination";
import { UserTableRow } from "./UserTableRow";
import { AddUserModal } from "../molecules/AddUserModal";

export const UsersTable = () => {
  const users = useUserStore((state) => state.users);
  const sortConfig = useUserStore((state) => state.sortConfig);
  const totalResults = useUserStore((state) => state.totalResults);
  const isTableLoading = useUserStore((state) => state.isTableLoading);
  const setSort = useUserStore((state) => state.setSort);
  const fetchData = useUserStore((state) => state.fetchData);
  const fetchInitialData = useUserStore((state) => state.fetchInitialData);

  const selectedUserIds = useUserStore((state) => state.selectedUserIds);
  const toggleSelectAll = useUserStore((state) => state.toggleSelectAllCurrentPage);

  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetchInitialData(controller.signal);
    fetchData(controller.signal);
    return () => controller.abort();
  }, [fetchData, fetchInitialData]);

  const handleSortRotation = (key: string) => {
    if (sortConfig?.key !== key) {
      setSort({ key, order: "asc" });
      return;
    }
    if (sortConfig.order === "asc") setSort({ key, order: "desc" });
    else setSort(null);
  };

  const handleEditUser = (user: User) => {
    setUserToEdit(user);
    setIsEditModalOpen(true);
  };

  const isAllPageSelected = users.length > 0 && users.every(u => selectedUserIds.includes(u.id));
  const isPartialSelected = users.some(u => selectedUserIds.includes(u.id)) && !isAllPageSelected;

  const rows = useMemo(() => {
    if (isTableLoading) {
      return Array.from({ length: 10 }).map((_, index) => (
        <UserTableRow key={`skeleton-${index}`} index={index} onEdit={() => {}} isLoading={true} />
      ));
    }
    return users.map((user, index) => (
      <UserTableRow key={user.id} user={user} index={index} onEdit={() => handleEditUser(user)} />
    ));
  }, [users, isTableLoading]);

  return (
    <div className="mt-8 flex flex-col border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm bg-neutral-50/50 dark:bg-[#1A1A1A]">
      <div className="px-6 md:px-10 py-6">
        <TableToolbar totalResults={totalResults} />
      </div>
      
      <div className="relative flex flex-col">
        <div className="overflow-x-auto scrollbar-none border-y border-black/5 dark:border-white/5">
          <div className="min-w-[1000px]">
            <div className="bg-[#EEEFF0] dark:bg-[#1A1A1A]">
              <Table className="w-full table-fixed">
                <TableHeader className="hover:bg-transparent border-none">
                  <TableRow className="hover:bg-transparent border-none">
                    <TableHead className="w-16 pl-6 py-4">
                      <Checkbox 
                        checked={isAllPageSelected || (isPartialSelected ? "indeterminate" : false)}
                        onCheckedChange={() => toggleSelectAll()}
                        className="border-neutral-300 dark:border-white/10 data-[state=checked]:bg-indigo-600 cursor-pointer"
                      />
                    </TableHead>
                    <SortableTableHead icon={UserIcon} label="Name" sortKey="name" currentSort={sortConfig} onSort={handleSortRotation} className="w-[28%]" />
                    <SortableTableHead icon={Phone} label="Phone" sortKey="phone" currentSort={sortConfig} onSort={handleSortRotation} className="w-[18%]" />
                    <SortableTableHead icon={MapPin} label="Location" sortKey="location" currentSort={sortConfig} onSort={handleSortRotation} className="w-[16%]" />
                    <SortableTableHead icon={Building2} label="Company" sortKey="company" currentSort={sortConfig} onSort={handleSortRotation} className="w-[20%]" />
                    <SortableTableHead icon={CheckSquare} label="Status" sortKey="status" currentSort={sortConfig} onSort={handleSortRotation} className="w-32" />
                    <TableHead className="w-20 pr-6" />
                  </TableRow>
                </TableHeader>
              </Table>
            </div>

            <div className="h-96 overflow-y-auto scrollbar-none transition-opacity duration-200 ${isTableLoading ? 'opacity-50' : 'opacity-100'}">
              <Table className="w-full table-fixed">
                <TableBody>
                  {users.length === 0 && !isTableLoading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-20 text-neutral-500">
                        No users found
                      </TableCell>
                    </TableRow>
                  ) : (
                    rows
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-black/5 dark:border-white/5">
        <TablePagination />
      </div>

         <AddUserModal
        isOpen={isEditModalOpen}
        onOpenChange={(open) => {
          setIsEditModalOpen(open);
          if (!open) setUserToEdit(null);
        }}
        userToEdit={userToEdit}
        isEditing={true}
      />
    </div>
  );
};