export interface Technology {
    _id?: string;
    name: string;
    category: TechnologyCategory;
    icon?: string;
    color?: string;
    proficiency: number;
    yearsOfExperience?: number;
    description?: string;
    relatedProjects?: string[];
    isFavorite?: boolean;
    order?: number;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    proficiencyLevel?: 'Expert' | 'Advanced' | 'Intermediate' | 'Beginner' | 'Learning';
}

export type TechnologyCategory =
    | 'Programming Language'
    | 'Frontend Framework'
    | 'Backend Framework'
    | 'Database'
    | 'DevOps & Tools'
    | 'Cloud Platform'
    | 'Mobile Development'
    | 'Design & UX'
    | 'Testing'
    | 'Other';
