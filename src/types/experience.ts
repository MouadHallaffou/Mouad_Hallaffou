export interface Experience {
    _id?: string;
    company: string;
    position: string;
    location?: string;
    startDate: Date | string;
    endDate?: Date | string;
    current?: boolean;
    description?: string;
    responsibilities?: string[];
    achievements?: string[];
    technologies?: string[];
    logo?: string;
    companyWebsite?: string;
    employmentType?: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance' | 'Internship';
    order?: number;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    duration?: string;
}
