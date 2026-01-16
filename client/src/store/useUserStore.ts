import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { userService } from '@/services/usersService';
import { Statics, User } from '@/types';

interface UserState {
  users: User[];
  statics: Statics | null;
  isLoading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      users: [],
      statics: null,
      isLoading: false,
      error: null,

      fetchData: async () => {
        const { users } = get();
        set({ isLoading: users.length === 0, error: null });

        try {
          const [usersData, staticsData] = await Promise.all([
            userService.getAllUsers(),
            userService.getStatics(),
          ]);
          set({ users: usersData, statics: staticsData, isLoading: false });
        } catch (err) {
          set({ error: (err as Error).message, isLoading: false });
        }
      },
    }),
    {
      name: 'invera-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        users: state.users, 
        statics: state.statics 
      }),
    }
  )
);