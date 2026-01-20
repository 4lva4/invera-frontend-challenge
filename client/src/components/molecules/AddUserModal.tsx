import React, { useEffect, useMemo, useRef, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useUserStore } from "@/store/useUserStore";
import { type User } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { UserCategory, UserStatus, UserType } from "@/enums/index.enum";
import { userSchema } from "@/schemas/user.schema";

type UserFormData = z.infer<typeof userSchema>;

interface AddUserModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  userToEdit?: User | null;
}

export const AddUserModal = ({
  isOpen,
  onOpenChange,
  userToEdit,
}: AddUserModalProps) => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const wasOpenRef = useRef(false);
  const { addUser, updateUser, isTableLoading } = useUserStore();
  const [isEditing, setIsEditing] = React.useState(userToEdit ? true : false);

  const initialValues = useMemo(
    () => ({
      name: "",
      email: "",
      phone: "",
      company: "",
      location: "",
      status: UserStatus.ONLINE,
      category: UserCategory.NEW,
      type: UserType.DIRECT,
    }),
    [],
  );

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: initialValues,
  });

  const nameRegister = register("name");

  const handleNameRef = useCallback(
    (el: HTMLInputElement | null) => {
      nameRegister.ref(el);
      nameInputRef.current = el;
    },
    [nameRegister],
  );

  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      reset(userToEdit ? userToEdit : initialValues);
      if (userToEdit && nameInputRef.current) {
        requestAnimationFrame(() => {
          if (nameInputRef.current) {
            nameInputRef.current.setSelectionRange(
              nameInputRef.current.value.length,
              nameInputRef.current.value.length,
            );
          }
        });
      }
    }
    wasOpenRef.current = isOpen;
  }, [isOpen, reset, initialValues, userToEdit]);

  const onSubmit = async (data: UserFormData) => {
    try {
      const formattedData = data as unknown as Partial<User>;

      if (userToEdit) {
        await updateUser(userToEdit.id, formattedData);
        onOpenChange(false);
        toast.success("User updated successfully");
      } else {
        await addUser(formattedData as User);
        toast.success("User created successfully");
        onOpenChange(false);
        reset(initialValues);
      }
    } catch {
      toast.error("An error occurred");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="[&>button]:cursor-pointer [&>button]:text-black [&>button]:dark:text-white max-w-[95vw] sm:max-w-lg bg-[#EEEFF0] dark:bg-[#121212] dark:bg-linear-to-b dark:from-[#1a1a1a] dark:to-[#0d0d0d] border-black/5 dark:border-white/5 text-neutral-900 dark:text-white p-0 overflow-hidden rounded-[2rem] shadow-2xl transition-colors max-h-[90vh] flex flex-col">
        <div className="p-6 md:p-10 overflow-y-auto scrollbar-none flex-1">
          <DialogHeader className="mb-6 md:mb-8">
            <DialogTitle className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
              {isEditing ? "Edit User" : "New User"}
            </DialogTitle>
            <DialogDescription className="text-neutral-500 dark:text-neutral-400 text-[11px] md:text-xs mt-1">
              Complete the details below to save the user information.
            </DialogDescription>
          </DialogHeader>

          <form
            id="user-form"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1 cursor-default">
                  Full Name
                </Label>
                <Input
                  {...nameRegister}
                  ref={handleNameRef}
                  disabled={isTableLoading}
                  placeholder="e.g. John Doe"
                  onFocus={(e) =>
                    e.target.setSelectionRange(
                      e.target.value.length,
                      e.target.value.length,
                    )
                  }
                  className="bg-neutral-100 dark:bg-white/5 border-black/5 dark:border-white/10 text-neutral-900 dark:text-white placeholder:text-neutral-400 h-11 rounded-xl text-sm px-4 focus:border-neutral-300 dark:focus:border-white/20 transition-all w-full disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {errors.name && (
                  <p className="text-red-500/90 text-[10px] ml-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1 cursor-default">
                    Email address
                  </Label>
                  <Input
                    {...register("email")}
                    disabled={isTableLoading}
                    placeholder="mail@example.com"
                    onFocus={(e) =>
                      e.target.setSelectionRange(
                        e.target.value.length,
                        e.target.value.length,
                      )
                    }
                    className="bg-neutral-100 dark:bg-white/5 border-black/5 dark:border-white/10 text-neutral-900 dark:text-white h-11 rounded-xl text-sm px-4 w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  {errors.email && (
                    <p className="text-red-500/90 text-[10px] ml-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1 cursor-default">
                    Phone number
                  </Label>
                  <Input
                    {...register("phone")}
                    disabled={isTableLoading}
                    placeholder="+1..."
                    onFocus={(e) =>
                      e.target.setSelectionRange(
                        e.target.value.length,
                        e.target.value.length,
                      )
                    }
                    className="bg-neutral-100 dark:bg-white/5 border-black/5 dark:border-white/10 text-neutral-900 dark:text-white h-11 rounded-xl text-sm px-4 w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  {errors.phone && (
                    <p className="text-red-500/90 text-[10px] ml-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1 cursor-default">
                    Company
                  </Label>
                  <Input
                    {...register("company")}
                    disabled={isTableLoading}
                    placeholder="Company Name"
                    onFocus={(e) =>
                      e.target.setSelectionRange(
                        e.target.value.length,
                        e.target.value.length,
                      )
                    }
                    className="bg-neutral-100 dark:bg-white/5 border-black/5 dark:border-white/10 text-neutral-900 dark:text-white h-11 rounded-xl text-sm px-4 w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  {errors.company && (
                    <p className="text-red-500/90 text-[10px] ml-1">
                      {errors.company.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1 cursor-default">
                    Country / Location
                  </Label>
                  <Input
                    {...register("location")}
                    disabled={isTableLoading}
                    placeholder="e.g. Argentina"
                    onFocus={(e) =>
                      e.target.setSelectionRange(
                        e.target.value.length,
                        e.target.value.length,
                      )
                    }
                    className="bg-neutral-100 dark:bg-white/5 border-black/5 dark:border-white/10 text-neutral-900 dark:text-white h-11 rounded-xl text-sm px-4 w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  {errors.location && (
                    <p className="text-red-500/90 text-[10px] ml-1">
                      {errors.location.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-3 pt-2">
                <Label className="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-widest flex items-center gap-2 ml-1 cursor-default">
                  <span className="w-1 h-1 bg-indigo-500 rounded-full" />
                  System Classification
                </Label>
                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3">
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isTableLoading}
                      >
                        <SelectTrigger className="w-full bg-neutral-100 dark:bg-white/5 border-black/5 dark:border-white/10 h-11 text-xs font-medium rounded-xl px-4 text-neutral-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-[#1a1a1a] border-black/5 dark:border-white/10 text-neutral-900 dark:text-white rounded-xl">
                          <SelectItem value={UserStatus.ONLINE}>
                            {UserStatus.ONLINE}
                          </SelectItem>
                          <SelectItem value={UserStatus.OFFLINE}>
                            {UserStatus.OFFLINE}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isTableLoading}
                      >
                        <SelectTrigger className="w-full bg-neutral-100 dark:bg-white/5 border-black/5 dark:border-white/10 h-11 text-xs font-medium rounded-xl px-4 disabled:opacity-50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-[#1a1a1a] border-black/5 dark:border-white/10 rounded-xl">
                          <SelectItem value={UserCategory.NEW}>
                            {UserCategory.NEW}
                          </SelectItem>
                          <SelectItem value={UserCategory.TOP}>
                            {UserCategory.TOP}
                          </SelectItem>
                          <SelectItem value={UserCategory.OTHER}>
                            {UserCategory.OTHER}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <Controller
                    name="type"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isTableLoading}
                      >
                        <SelectTrigger className="w-full bg-neutral-100 dark:bg-white/5 border-black/5 dark:border-white/10 h-11 text-xs font-medium rounded-xl px-4 disabled:opacity-50 md:col-span-1 xs:col-span-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-[#1a1a1a] border-black/5 dark:border-white/10 rounded-xl">
                          <SelectItem value={UserType.DIRECT}>
                            {UserType.DIRECT}
                          </SelectItem>
                          <SelectItem value={UserType.ORGANIC}>
                            {UserType.ORGANIC}
                          </SelectItem>
                          <SelectItem value={UserType.SOCIAL}>
                            {UserType.SOCIAL}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="flex items-center justify-end gap-4 p-6 border-t border-black/5 dark:border-white/5 bg-white dark:bg-[#0d0d0d]/50 backdrop-blur-sm">
          <Button
            variant="ghost"
            type="button"
            disabled={isTableLoading}
            onClick={() => onOpenChange(false)}
            className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest hover:text-neutral-900 dark:hover:text-white hover:bg-transparent transition-colors cursor-pointer disabled:opacity-30"
          >
            Cancel
          </Button>
          <Button
            form="user-form"
            type="submit"
            disabled={isTableLoading}
            className="bg-neutral-900 dark:bg-white text-white dark:text-black h-10 px-8 rounded-xl text-[10px] uppercase font-black tracking-widest hover:bg-neutral-700 dark:hover:bg-neutral-200 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
          >
            {isTableLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : isEditing ? (
              "Save changes"
            ) : (
              "Create user"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
