import { apiService } from './api';
import { Resume } from '../types/resume';

export const resumeService = {
    // Get all resume sections
    getAll: async (params?: { section?: string }) => {
        return apiService.get<Resume[]>('/resume', params);
    },

    // Get resume section by ID
    getById: async (id: string) => {
        return apiService.get<Resume>(`/resume/${id}`);
    },

    // Create resume section
    create: async (data: Partial<Resume>) => {
        return apiService.post<Resume>('/resume', data);
    },

    // Update resume section
    update: async (id: string, data: Partial<Resume>) => {
        return apiService.put<Resume>(`/resume/${id}`, data);
    },

    // Delete resume section
    delete: async (id: string) => {
        return apiService.delete(`/resume/${id}`);
    },
};
