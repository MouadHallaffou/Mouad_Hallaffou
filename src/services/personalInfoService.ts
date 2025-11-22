import { apiService } from './api';
import { PersonalInfo } from '../types/personalInfo';

export const personalInfoService = {
    // Get all personal info
    getAll: async () => {
        return apiService.get<PersonalInfo[]>('/personalInfo');
    },

    // Get active personal info
    getActive: async () => {
        return apiService.get<PersonalInfo>('/personalInfo/active');
    },

    // Get personal info by ID
    getById: async (id: string) => {
        return apiService.get<PersonalInfo>(`/personalInfo/${id}`);
    },

    // Create personal info
    create: async (data: Partial<PersonalInfo>) => {
        return apiService.post<PersonalInfo>('/personalInfo', data);
    },

    // Update personal info
    update: async (id: string, data: Partial<PersonalInfo>) => {
        return apiService.put<PersonalInfo>(`/personalInfo/${id}`, data);
    },

    // Delete personal info
    delete: async (id: string) => {
        return apiService.delete(`/personalInfo/${id}`);
    },
};
