import { apiService } from './api';
import { Certification } from '../types/certification';

export const certificationService = {
    // Get all certifications
    getAll: async () => {
        return apiService.get<Certification[]>('/certifications');
    },

    // Get certification by ID
    getById: async (id: string) => {
        return apiService.get<Certification>(`/certifications/${id}`);
    },

    // Create certification
    create: async (data: Partial<Certification>) => {
        return apiService.post<Certification>('/certifications', data);
    },

    // Update certification
    update: async (id: string, data: Partial<Certification>) => {
        return apiService.put<Certification>(`/certifications/${id}`, data);
    },

    // Delete certification
    delete: async (id: string) => {
        return apiService.delete(`/certifications/${id}`);
    },
};
