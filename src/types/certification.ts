export interface Certification {
    _id?: string;
    name: string;
    issuer: string;
    issueDate: Date | string;
    expiryDate?: Date | string;
    credentialId?: string;
    credentialUrl?: string;
    description?: string;
    logo?: string;
    skills?: string[];
    order?: number;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    isExpired?: boolean;
    isExpiringSoon?: boolean;
}
