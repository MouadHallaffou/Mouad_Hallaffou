export interface SocialLink {
    _id?: string;
    platform: SocialPlatform;
    url: string;
    username?: string;
    icon?: string;
    color?: string;
    order?: number;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

export type SocialPlatform =
    | 'GitHub'
    | 'LinkedIn'
    | 'Twitter'
    | 'Facebook'
    | 'Instagram'
    | 'YouTube'
    | 'Medium'
    | 'Dev.to'
    | 'Stack Overflow'
    | 'CodePen'
    | 'Dribbble'
    | 'Behance'
    | 'Portfolio'
    | 'Blog'
    | 'Other';
