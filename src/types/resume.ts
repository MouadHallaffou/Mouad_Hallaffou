export interface Resume {
    _id?: string;
    section: ResumeSection;
    title: string;
    content: string;
    order?: number;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

export type ResumeSection =
    | 'Summary'
    | 'Skills'
    | 'Experience'
    | 'Education'
    | 'Projects'
    | 'Certifications'
    | 'Custom';
