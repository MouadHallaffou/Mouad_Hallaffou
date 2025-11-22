import { apiService } from './api';
import { Technology } from '../types/technology';

export const technologyService = {
    // Get all technologies
    getAll: async (params?: { category?: string; favorite?: boolean }) => {
        return apiService.get<Technology[]>('/technologies', params);
    },

    // Get all categories
    getCategories: async () => {
        return apiService.get<string[]>('/technologies/categories');
    },

    // Get technology by ID
    getById: async (id: string) => {
        return apiService.get<Technology>(`/technologies/${id}`);
    },

    // Create technology
    create: async (data: Partial<Technology>) => {
        return apiService.post<Technology>('/technologies', data);
    },

    // Update technology
    update: async (id: string, data: Partial<Technology>) => {
        return apiService.put<Technology>(`/technologies/${id}`, data);
    },

    // Delete technology
    delete: async (id: string) => {
        return apiService.delete(`/technologies/${id}`);
    },
};
