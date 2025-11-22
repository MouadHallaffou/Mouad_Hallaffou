import { apiService } from './api';
import { Experience } from '../types/experience';

export const experienceService = {
    // Get all experience entries
    getAll: async () => {
        return apiService.get<Experience[]>('/experience');
    },

    // Get experience by ID
    getById: async (id: string) => {
        return apiService.get<Experience>(`/experience/${id}`);
    },

    // Create experience entry
    create: async (data: Partial<Experience>) => {
        return apiService.post<Experience>('/experience', data);
    },

    // Update experience entry
    update: async (id: string, data: Partial<Experience>) => {
        return apiService.put<Experience>(`/experience/${id}`, data);
    },

    // Delete experience entry
    delete: async (id: string) => {
        return apiService.delete(`/experience/${id}`);
    },
};
