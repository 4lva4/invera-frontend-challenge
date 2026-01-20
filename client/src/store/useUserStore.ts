import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User, SortConfig, Statics, UserTypesData } from "@/types";
import { userService } from "@/services/usersService";
import { mapUserAdapter } from "@/services/user.adapter";

interface UserState {
  users: User[];
  statics: Statics | null;
  userTypes: UserTypesData | null;
  allCompanies: string[];
  isLoading: boolean;
  isTableLoading: boolean;
  error: string | null;
  sortConfig: SortConfig | null;
  searchQuery: string;
  statusFilter: string;
  companyFilter: string;
  currentPage: number;
  itemsPerPage: number;
  totalResults: number;
  selectedUserIds: string[];
  setSelectedUserIds: (ids: string[]) => void;
  toggleUserSelection: (id: string) => void;
  toggleSelectAllCurrentPage: () => void; // Nueva acción
  clearSelection: () => void;
  setSort: (config: SortConfig | null) => void;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: string) => void;
  setCompanyFilter: (company: string) => void;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (limit: number) => void;
  fetchData: (signal?: AbortSignal) => Promise<void>;
  fetchInitialData: (signal?: AbortSignal) => Promise<void>;
  addUser: (user: Omit<User, "id">) => Promise<void>;
  updateUser: (id: string, userData: Partial<User>) => Promise<void>;
  deleteUser: (user: User) => Promise<void>;
  deleteMultipleUsers: (users: User[]) => Promise<void>;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      users: [],
      statics: null,
      userTypes: null,
      allCompanies: [],
      isLoading: false,
      isTableLoading: false,
      error: null,
      sortConfig: null,
      searchQuery: "",
      statusFilter: "",
      companyFilter: "",
      currentPage: 1,
      itemsPerPage: 10,
      totalResults: 0,
      selectedUserIds: [],

      setSelectedUserIds: (ids) => set({ selectedUserIds: ids }),

      toggleUserSelection: (id) => {
        const { selectedUserIds } = get();
        const newSelection = selectedUserIds.includes(id)
          ? selectedUserIds.filter((itemId) => itemId !== id)
          : [...selectedUserIds, id];
        set({ selectedUserIds: newSelection });
      },

      toggleSelectAllCurrentPage: () => {
        const { users, selectedUserIds } = get();
        const currentPageIds = users.map((u) => u.id);
        const allCurrentSelected = currentPageIds.every((id) =>
          selectedUserIds.includes(id)
        );

        if (allCurrentSelected) {
          set({
            selectedUserIds: selectedUserIds.filter(
              (id) => !currentPageIds.includes(id)
            ),
          });
        } else {
          const newSelection = Array.from(
            new Set([...selectedUserIds, ...currentPageIds])
          );
          set({ selectedUserIds: newSelection });
        }
      },

      clearSelection: () => set({ selectedUserIds: [] }),

      setSort: (config) => {
        set({ sortConfig: config, currentPage: 1 });
        get().fetchData();
      },
      setSearchQuery: (query) => {
        set({ searchQuery: query, currentPage: 1 });
        get().fetchData();
      },
      setStatusFilter: (status) => {
        set({ statusFilter: status, currentPage: 1 });
        get().fetchData();
      },
      setCompanyFilter: (company) => {
        set({ companyFilter: company, currentPage: 1 });
        get().fetchData();
      },
      setCurrentPage: (page) => {
        set({ currentPage: page });
        get().fetchData();
      },
      setItemsPerPage: (limit) => {
        set({ itemsPerPage: limit, currentPage: 1 });
        get().fetchData();
      },

      fetchData: async (signal) => {
        set({ isTableLoading: true });
        try {
          const {
            sortConfig,
            searchQuery,
            currentPage,
            itemsPerPage,
            statusFilter,
            companyFilter,
          } = get();
          const res = await userService.getAllUsers(
            signal,
            sortConfig,
            searchQuery,
            currentPage,
            itemsPerPage,
            statusFilter,
            companyFilter,
          );

          const normalizedUsers = res.data.map(mapUserAdapter);

          set({
            users: normalizedUsers,
            totalResults: res.totalCount,
            isTableLoading: false,
          });
        } catch {
          set({ isTableLoading: false });
        }
      },

      fetchInitialData: async (signal) => {
        set({ isLoading: true });
        try {
          const [staticsData, userTypesData, companiesRes] = await Promise.all([
            userService.getStatics(signal),
            userService.getUserTypes(signal),
            userService.getAllUsers(signal, null, "", 1, 1000),
          ]);
          const normalizedAllUsers = companiesRes.data.map(mapUserAdapter);
          const uniqueCompanies = Array.from(
            new Set(normalizedAllUsers.map((u) => u.company)),
          )
            .filter(Boolean)
            .sort() as string[];

          set({
            statics: staticsData,
            userTypes: userTypesData,
            allCompanies: uniqueCompanies,
            isLoading: false,
          });
        } catch {
          set({ isLoading: false });
        }
      },

      addUser: async (userData) => {
        set({ isLoading: true });
        set({ isTableLoading: true });
        try {
          await userService.createUser(userData);
          const current = get().statics;
          if (current) {
            const updated = { ...current, totalUsers: current.totalUsers + 1 };
            if (userData.category === "New") updated.newUsers += 1;
            else if (userData.category === "Top") updated.topUsers += 1;
            else updated.otherUsers += 1;
            await userService.updateStatics(updated);
            set({ statics: updated });
          }
          await get().fetchData();
        } finally {
          set({ isTableLoading: false });
          set({ isLoading: false });
        }
      },

      updateUser: async (id, userData) => {
        set({ isLoading: true });
        set({ isTableLoading: true });
        try {
          const oldUser = get().users.find((u) => u.id === id);
          await userService.updateUser(id, userData);

          const current = get().statics;
          if (
            current &&
            oldUser &&
            userData.category &&
            oldUser.category !== userData.category
          ) {
            const updated = { ...current };
            if (oldUser.category === "New") updated.newUsers -= 1;
            else if (oldUser.category === "Top") updated.topUsers -= 1;
            else updated.otherUsers -= 1;

            if (userData.category === "New") updated.newUsers += 1;
            else if (userData.category === "Top") updated.topUsers += 1;
            else updated.otherUsers += 1;

            await userService.updateStatics(updated);
            set({ statics: updated });
          }
          await get().fetchData();
        } finally {
          set({ isTableLoading: false });
          set({ isLoading: false });
        }
      },

      deleteUser: async (user) => {
        set({ isLoading: true });
        set({ isTableLoading: true });
        try {
          await userService.deleteUser(user.id);
          const current = get().statics;
          if (current) {
            const updated = { ...current, totalUsers: current.totalUsers - 1 };

            if (user.category === "New") updated.newUsers -= 1;
            else if (user.category === "Top") updated.topUsers -= 1;
            else updated.otherUsers -= 1;
            await userService.updateStatics(updated);
            set({ statics: updated });
          }
          await get().fetchData();
        } finally {
          set({
            isTableLoading: false,
          });
          set({ isLoading: false });
        }
      },

      deleteMultipleUsers: async (usersToDelete) => {
        set({ isLoading: true });
        set({ isTableLoading: true });
        try {
          await Promise.all(usersToDelete.map((u) => userService.deleteUser(u.id)));

          const current = get().statics;
          if (current) {
            const updated = { ...current, totalUsers: current.totalUsers - usersToDelete.length };

            usersToDelete.forEach((user) => {
              if (user.category === "New") updated.newUsers -= 1;
              else if (user.category === "Top") updated.topUsers -= 1;
              else updated.otherUsers -= 1;
            });

            await userService.updateStatics(updated);
            set({ statics: updated });
          }

          set({ selectedUserIds: [] });
          await get().fetchData();
        } finally {
          set({ isTableLoading: false, isLoading: false });
        }
      },
    }),
    {
      name: "invera-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ statics: state.statics }),
    },
  ),
);