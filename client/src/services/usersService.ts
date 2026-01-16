import { Statics, User } from "@/types";

const API_URL = 'http://localhost:8000';

export const userService = {
    
  async getAllUsers(): Promise<User[]> {
    const response = await fetch(`${API_URL}/users`, {
      cache: 'no-store', 
    });
    
    if (!response.ok) {
      throw new Error('Error al obtener usuarios');
    }
    
    return response.json();
  },

  async getStatics(): Promise<Statics> {
    const response = await fetch(`${API_URL}/statics`, {
      next: { revalidate: 60 }, 
    });

    if (!response.ok) {
      throw new Error('Error al obtener estadísticas');
    }

    return response.json();
  }
  
};