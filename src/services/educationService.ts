import { apiService } from './api';
import { Education } from '../types/education';

export const educationService = {
    // Get all education entries
    getAll: async () => {
        return apiService.get<Education[]>('/education');
    },

    // Get education by ID
    getById: async (id: string) => {
        return apiService.get<Education>(`/education/${id}`);
    },

    // Create education entry
    create: async (data: Partial<Education>) => {
        return apiService.post<Education>('/education', data);
    },

    // Update education entry
    update: async (id: string, data: Partial<Education>) => {
        return apiService.put<Education>(`/education/${id}`, data);
    },

    // Delete education entry
    delete: async (id: string) => {
        return apiService.delete(`/education/${id}`);
    },
};
