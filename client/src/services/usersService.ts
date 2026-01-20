import { User, SortConfig, Statics, UserTypesData } from '@/types';
import { apiClient, apiClientFull } from '@/utils/api-client';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const userService = {
  getAllUsers: async (
    signal?: AbortSignal,
    sortConfig?: SortConfig | null,
    searchQuery: string = '',
    page: number = 1,
    limit: number = 10,
    status: string = '',
    company: string = ''
  ): Promise<{ data: User[]; totalCount: number }> => {
    const params = new URLSearchParams();
    params.append('_page', page.toString());
    params.append('_limit', limit.toString());

    if (sortConfig) {
      params.append('_sort', sortConfig.key);
      params.append('_order', sortConfig.order);
    }

    if (searchQuery) params.append('q', searchQuery);
    if (status && status !== '' && status !== 'all') params.append('status', status);
    if (company && company !== '' && company !== 'all') params.append('company', company);

    const response = await apiClientFull(`/users?${params.toString()}`, { signal });
    if (!response.ok) throw new Error('Failed to fetch users');

    const data = await response.json();
    const totalCount = Number(response.headers.get("X-Total-Count")) || 0;
    return { data, totalCount };
  },

  getStatics: async (signal?: AbortSignal): Promise<Statics> => {
    return apiClient<Statics>('/statics', { signal });
  },

  updateStatics: async (statics: Statics): Promise<Statics> => {
    const response = await fetch(`${API_URL}/statics`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(statics),
    });
    if (!response.ok) throw new Error('Error updating statics');
    return response.json();
  },

  getUserTypes: async (signal?: AbortSignal): Promise<UserTypesData> => {
    return apiClient<UserTypesData>('/userTypes', { signal });
  },

  createUser: async (user: Omit<User, 'id'>): Promise<User> => {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    return response.json();
  },

  updateUser: async (id: string, user: Partial<User>): Promise<User> => {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    return response.json();
  },

  deleteUser: async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error deleting user');
  }
};