// Project Types
export interface Project {
  _id: string;
  title: string;
  description: string;
  shortDescription?: string;
  image: string;
  images?: string[];
  github?: string;
  demo?: string;
  category: ProjectCategory;
  technologies: string[];
  featured: boolean;
  status: ProjectStatus;
  startDate?: string;
  endDate?: string;
  isActive: boolean;
  order: number;
  views: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
}

export type ProjectCategory = 
  | 'Full Stack'
  | 'Frontend'
  | 'Backend'
  | 'Mobile'
  | 'Design'
  | 'Other';

export type ProjectStatus = 
  | 'completed'
  | 'in-progress'
  | 'planned';

export interface CreateProjectData {
  title: string;
  description: string;
  shortDescription?: string;
  image: string;
  images?: string[];
  github?: string;
  demo?: string;
  category: ProjectCategory;
  technologies: string[];
  featured?: boolean;
  status?: ProjectStatus;
  startDate?: string;
  endDate?: string;
}

export interface UpdateProjectData extends Partial<CreateProjectData> {
  isActive?: boolean;
  order?: number;
}

export interface ProjectStats {
  total: number;
  featured: number;
  byCategory: Record<ProjectCategory, number>;
  byStatus: Record<ProjectStatus, number>;
  totalViews: number;
  totalLikes: number;
}
