import { act } from '@testing-library/react';
import { useUserStore } from '../store/useUserStore';
import { User } from '@/types';

const mockUsers = [
  { id: '1', name: 'User 1', email: 'email1@example.com', type: 'NeSocialw', category: 'New', company: 'A', status: 'Online', location: 'Argentina', phone: '1234123' },
  { id: '2', name: 'User 2', email: 'email2@example.com', type: 'Social', category: 'New', company: 'B', status: 'Offline', location: 'Argentina', phone: '1234123' },
  { id: '3', name: 'User 3', email: 'email3@example.com', type: 'Social', category: 'New', company: 'A', status: 'Online', location: 'Argentina', phone: '1234123' },
] as unknown as User[];

describe('useUserStore - Selección y Filtros', () => {
  
  beforeEach(() => {
    act(() => {
      useUserStore.setState({ 
        selectedUserIds: [], 
        users: mockUsers, 
        currentPage: 1 
      });
    });
  });

  it('debe agregar un ID a la selección individualmente', () => {
    act(() => {
      useUserStore.getState().toggleUserSelection('1');
    });
    expect(useUserStore.getState().selectedUserIds).toContain('1');
  });

  it('debe quitar un ID de la selección si ya estaba presente', () => {
    act(() => {
      useUserStore.getState().toggleUserSelection('1');
      useUserStore.getState().toggleUserSelection('1');
    });
    expect(useUserStore.getState().selectedUserIds).not.toContain('1');
  });

  it('debe seleccionar todos los usuarios de la página actual', () => {
    act(() => {
      useUserStore.getState().toggleSelectAllCurrentPage();
    });
    
    const selectedIds = useUserStore.getState().selectedUserIds;
    expect(selectedIds).toHaveLength(3);
  });

  it('debe deseleccionar todos si ya estaban marcados', () => {
    act(() => {
      useUserStore.getState().setSelectedUserIds(['1', '2', '3']);
      useUserStore.getState().toggleSelectAllCurrentPage();
    });
    expect(useUserStore.getState().selectedUserIds).toHaveLength(0);
  });

  it('debe resetear la página a 1 al cambiar el buscador', () => {
    act(() => {
      useUserStore.setState({ currentPage: 2 });
      useUserStore.getState().setSearchQuery('test');
    });
    expect(useUserStore.getState().currentPage).toBe(1);
  });
});