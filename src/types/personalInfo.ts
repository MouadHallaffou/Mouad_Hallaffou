export interface PersonalInfo {
    _id?: string;
    fullName: string;
    title: string;
    tagline?: string;
    bio: string;
    shortBio?: string;
    avatar?: string;
    coverImage?: string;
    email: string;
    phone?: string;
    location?: string;
    website?: string;
    birthDate?: Date | string;
    nationality?: string;
    languages?: Language[];
    availability?: 'Available' | 'Not Available' | 'Open to Offers';
    resumeFile?: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

export interface Language {
    name: string;
    level: 'Native' | 'Fluent' | 'Intermediate' | 'Basic';
}
