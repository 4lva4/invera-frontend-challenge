import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Statics, User, UserTypesData } from '@/types';
import { userService } from '@/services/usersService';

interface UserState {
  users: User[];
  statics: Statics | null;
  userTypes: UserTypesData | null;
  isLoading: boolean;
  error: string | null;
  fetchData: (signal?: AbortSignal) => Promise<void>;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      users: [],
      statics: null,
      userTypes: null,
      isLoading: false,
      error: null,

      fetchData: async (signal?: AbortSignal) => {
        set({ isLoading: true, error: null });
        
        try {
          const [usersData, staticsData, userTypesData] = await Promise.all([
            userService.getAllUsers(signal),
            userService.getStatics(signal),
            userService.getUserTypes(signal)
          ]);

          set({ 
            users: usersData, 
            statics: staticsData, 
            userTypes: userTypesData, 
            isLoading: false 
          });
        } catch (err: unknown) { 
          if (err instanceof Error && err.name === 'AbortError') return;
          
          set({ 
            error: err instanceof Error ? err.message : 'Error desconocido', 
            isLoading: false 
          });
        }
      },
    }),
    {
      name: 'invera-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        users: state.users,
        statics: state.statics,
        userTypes: state.userTypes
      }),
    }
  )
);