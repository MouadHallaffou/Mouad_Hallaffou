// Skill Types
export interface Skill {
  _id: string;
  name: string;
  category: SkillCategory;
  level: number;
  icon: string;
  color: string;
  description?: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export type SkillCategory = 
  | 'Frontend Development'
  | 'Backend Development'
  | 'DevOps & Tools'
  | 'Design & UX'
  | 'Mobile Development'
  | 'Other';

export interface CreateSkillData {
  name: string;
  category: SkillCategory;
  level: number;
  icon?: string;
  color?: string;
  description?: string;
}

export interface UpdateSkillData extends Partial<CreateSkillData> {
  isActive?: boolean;
  order?: number;
}

export interface SkillStats {
  total: number;
  byCategory: Record<SkillCategory, number>;
  averageLevel: number;
}
