import React, { useEffect, useState } from 'react';
import { useUserStore } from '@/store/useUserStore';
import { UserStatus } from '@/enums/index.enum';
import { SearchInput } from '../ui/search';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from "@/components/ui/button";
import { Trash2, X } from "lucide-react";
import { DeleteUserModal } from './DeleteUserModal';

interface TableToolbarProps {
  totalResults: number;
}

export const TableToolbar = ({ totalResults }: TableToolbarProps) => {
  const setSearchQuery = useUserStore((state) => state.setSearchQuery);
  const setStatusFilter = useUserStore((state) => state.setStatusFilter);
  const setCompanyFilter = useUserStore((state) => state.setCompanyFilter);
  const initialStatus = useUserStore((state) => state.statusFilter);
  const initialCompany = useUserStore((state) => state.companyFilter);
  const allCompanies = useUserStore((state) => state.allCompanies);
  const fetchData = useUserStore((state) => state.fetchData);
  const currentPage = useUserStore((state) => state.currentPage);
  const itemsPerPage = useUserStore((state) => state.itemsPerPage);

  const selectedUserIds = useUserStore((state) => state.selectedUserIds);
  const clearSelection = useUserStore((state) => state.clearSelection);
  const users = useUserStore((state) => state.users);
  const deleteMultipleUsers = useUserStore((state) => state.deleteMultipleUsers);

  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const startRange = totalResults === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endRange = Math.min(currentPage * itemsPerPage, totalResults);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchQuery(searchTerm);
      fetchData();
    }, 400);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, setSearchQuery, fetchData]);

  const handleDeleteSelected = async () => {
    const usersToDelete = users.filter((u) => selectedUserIds.includes(u.id));
    await deleteMultipleUsers(usersToDelete);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Header con Título y Badge de resultados */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight">
          All Users
        </h2>
        <div className="bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-500/20">
          <p className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
            {startRange}-{endRange} <span className="text-neutral-400 mx-0.5">of</span> {totalResults}
          </p>
        </div>
      </div>

      {/* Contenedor Principal de Controles */}
      <div className="flex flex-col gap-3">
        
        {/* Fila 1: Buscador */}
        <div className="w-full">
          <SearchInput
            placeholder="Search for users..."
            value={searchTerm}
            onChange={setSearchTerm}
          />
        </div>

        {/* Fila 2: Filtros (Izquierda) y Acciones (Derecha) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Contenedor de Selects (Filtros) */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Select
              value={initialStatus || "all"}
              onValueChange={(val) => setStatusFilter(val === "all" ? "" : val)}
            >
              <SelectTrigger className="flex-1 sm:w-[130px] h-10 bg-white dark:bg-[#1f1f1f] border-black/5 dark:border-white/5 rounded-xl text-xs font-medium cursor-pointer">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="dark:bg-[#121212] dark:border-neutral-800">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value={UserStatus.ONLINE}>Online</SelectItem>
                <SelectItem value={UserStatus.OFFLINE}>Offline</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={initialCompany || "all"}
              onValueChange={(val) => setCompanyFilter(val === "all" ? "" : val)}
            >
              <SelectTrigger className="flex-1 sm:w-[160px] h-10 bg-white dark:bg-[#1f1f1f] border-black/5 dark:border-white/5 rounded-xl text-xs font-medium cursor-pointer">
                <SelectValue placeholder="Company" />
              </SelectTrigger>
              <SelectContent className="dark:bg-[#121212] dark:border-neutral-800">
                <div className="max-h-60 overflow-y-auto custom-scrollbar">
                  <SelectItem value="all">All Companies</SelectItem>
                  {allCompanies.map((company) => (
                    <SelectItem key={company} value={company}>{company}</SelectItem>
                  ))}
                </div>
              </SelectContent>
            </Select>
          </div>

          {/* Contenedor de Botones (Acciones de Selección) */}
          {selectedUserIds.length > 0 && (
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end animate-in fade-in slide-in-from-right-2">
              <Button
                onClick={() => setIsDeleteModalOpen(true)}
                className="flex-1 sm:flex-none bg-red-500 hover:bg-red-600 text-white h-10 px-4 rounded-xl text-[10px] uppercase font-black tracking-widest transition-all active:scale-95 flex gap-2 items-center justify-center shadow-lg shadow-red-500/10 cursor-pointer"
              >
                <Trash2 size={14} />
                DELETE ({selectedUserIds.length})
              </Button>
              <Button
                variant="outline"
                onClick={clearSelection}
                className="h-10 w-10 shrink-0 border-black/10 dark:border-white/10 text-neutral-500 hover:text-black dark:hover:text-white rounded-xl transition-all active:scale-95 flex items-center justify-center cursor-pointer bg-white dark:bg-white/5"
              >
                <X size={16} />
              </Button>
            </div>
          )}
        </div>
      </div>

      <DeleteUserModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onConfirm={handleDeleteSelected}
        userName={`${selectedUserIds.length} users`}
        isBulk
      />
    </div>
  );
};