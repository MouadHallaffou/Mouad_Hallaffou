export interface Education {
    _id?: string;
    institution: string;
    degree: string;
    field: string;
    location?: string;
    startDate: Date | string;
    endDate?: Date | string;
    current?: boolean;
    grade?: string;
    description?: string;
    logo?: string;
    achievements?: string[];
    order?: number;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    duration?: string;
}
