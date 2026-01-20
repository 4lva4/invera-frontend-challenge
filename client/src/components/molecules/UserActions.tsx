import React, { useState } from "react";
import { useTheme } from "next-themes";
import { Pencil, Trash2 } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { toast } from "sonner";
import { cn } from "@/lib/helpers";
import { DeleteUserModal } from "./DeleteUserModal"; 

interface UserActionsProps {
  userId: string;
  onEdit: () => void;
}

export const UserActions = ({ userId, onEdit }: UserActionsProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const deleteUser = useUserStore((state) => state.deleteUser);
  const users = useUserStore((state) => state.users);

  const user = users.find((u) => u.id === userId);

  const onConfirmDelete = async () => {
    if (!user) return;
    try {
      await deleteUser(user);
      toast.success("User deleted successfully");
      setIsDeleteModalOpen(false);
    } catch {
      toast.error("Error deleting user");
    }
  };

  return (
    <>
      <div className="flex items-center gap-1">
        <button
          onClick={onEdit}
          className={cn(
            "p-2 rounded-lg transition-all active:scale-90 cursor-pointer",
            isDark
              ? "hover:bg-white/5 text-neutral-500 hover:text-neutral-200"
              : "hover:bg-slate-200 text-slate-500 hover:text-slate-700"
          )}
          title="Edit user"
        >
          <Pencil size={16} />
        </button>

        <button
          onClick={() => setIsDeleteModalOpen(true)}
          className={cn(
            "p-2 rounded-lg transition-all active:scale-90 cursor-pointer",
            isDark
              ? "hover:bg-red-500/10 text-neutral-500 hover:text-red-500"
              : "hover:bg-red-100 text-slate-500 hover:text-red-600"
          )}
          title="Delete user"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <DeleteUserModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onConfirm={onConfirmDelete}
        userName={user?.name}
      />
    </>
  );
};
