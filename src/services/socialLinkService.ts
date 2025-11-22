import { apiService } from './api';
import { SocialLink } from '../types/socialLink';

export const socialLinkService = {
    // Get all social links
    getAll: async () => {
        return apiService.get<SocialLink[]>('/socialLinks');
    },

    // Get social link by ID
    getById: async (id: string) => {
        return apiService.get<SocialLink>(`/socialLinks/${id}`);
    },

    // Create social link
    create: async (data: Partial<SocialLink>) => {
        return apiService.post<SocialLink>('/socialLinks', data);
    },

    // Update social link
    update: async (id: string, data: Partial<SocialLink>) => {
        return apiService.put<SocialLink>(`/socialLinks/${id}`, data);
    },

    // Delete social link
    delete: async (id: string) => {
        return apiService.delete(`/socialLinks/${id}`);
    },
};
