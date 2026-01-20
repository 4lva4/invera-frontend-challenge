import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";

interface DeleteUserModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  userName?: string;
  isBulk?: boolean; 
}

export const DeleteUserModal = ({
  isOpen,
  onOpenChange,
  onConfirm,
  userName,
  isBulk = false,
}: DeleteUserModalProps) => {
  const isTableLoading = useUserStore((state) => state.isTableLoading);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-neutral-900 border-white/5 p-0 overflow-hidden rounded-3xl shadow-2xl">
        <div className="p-10">
          <DialogHeader className="mb-8">
            <DialogTitle className="text-2xl text-black dark:text-white tracking-tight">
              {isBulk ? "Delete Multiple Users" : "Delete User"}
            </DialogTitle>
            <DialogDescription className="text-neutral-500 text-sm mt-1">
              {isBulk 
                ? `You are about to delete ${userName}. Are you sure you want to proceed?`
                : <>You are about to delete <span className="text-black dark:text-white font-medium">{userName}</span>.</>
              }
              {" "}This action is permanent.
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center justify-end gap-4 pt-6 border-t border-black/5 dark:border-white/5">
            <Button
              variant="ghost"
              type="button"
              disabled={isTableLoading}
              onClick={() => onOpenChange(false)}
              className="text-xs font-bold text-neutral-500 uppercase tracking-widest hover:text-black hover:bg-transparent dark:hover:text-white dark:hover:bg-transparent transition-colors cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              disabled={isTableLoading}
              className="bg-red-500 text-white hover:bg-red-600 h-10 px-6 rounded-xl text-xs uppercase font-black tracking-widest transition-all active:scale-95 cursor-pointer disabled:opacity-50"
            >
              {isTableLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                isBulk ? "Delete All Selected" : "Delete User"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};