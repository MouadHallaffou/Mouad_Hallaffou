import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, EyeOff, Star, ExternalLink, Github, ArrowUp, ArrowDown } from 'lucide-react';
import { useApi, useApiMutation } from '../../hooks/useApi';

interface Project {
  _id: string;
  title: string;
  description: string;
  shortDescription?: string;
  image: string;
  images?: string[];
  github?: string;
  demo?: string;
  category: string;
  technologies: string[];
  featured: boolean;
  status: 'completed' | 'in-progress' | 'planned';
  startDate?: string;
  endDate?: string;
  isActive: boolean;
  order: number;
  views: number;
  likes: number;
}

interface ProjectsManagerProps {
  onClose?: () => void;
}

const ProjectsManager: React.FC<ProjectsManagerProps> = ({ onClose }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    image: '',
    github: '',
    demo: '',
    category: 'Full Stack',
    technologies: [] as string[],
    featured: false,
    status: 'completed' as 'completed' | 'in-progress' | 'planned',
    startDate: '',
    endDate: '',
  });
  const [newTechnology, setNewTechnology] = useState('');

  const { data: projects, loading, refetch } = useApi<Project[]>('/projects');
  const { mutate: createProject, loading: creating } = useApiMutation('/projects');
  const { mutate: updateProject, loading: updating } = useApiMutation('/projects');
  const { mutate: deleteProject, loading: deleting } = useApiMutation('/projects');
  const { mutate: toggleFeatured } = useApiMutation('/projects');
  const { mutate: updateOrder } = useApiMutation('/projects');

  const categories = [
    'Full Stack',
    'Frontend',
    'Backend',
    'Mobile',
    'Design',
    'Other'
  ];

  const statusOptions = [
    { value: 'completed', label: 'Completed' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'planned', label: 'Planned' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingProject) {
        await updateProject('PUT', formData, `/projects/${editingProject._id}`);
      } else {
        await createProject('POST', formData);
      }
      
      setShowForm(false);
      setEditingProject(null);
      resetForm();
      refetch();
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      shortDescription: project.shortDescription || '',
      image: project.image,
      github: project.github || '',
      demo: project.demo || '',
      category: project.category,
      technologies: project.technologies,
      featured: project.featured,
      status: project.status,
      startDate: project.startDate || '',
      endDate: project.endDate || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (projectId: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject('DELETE', undefined, `/projects/${projectId}`);
        refetch();
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const handleToggleFeatured = async (projectId: string, featured: boolean) => {
    try {
      await toggleFeatured('PUT', { featured: !featured }, `/projects/${projectId}/featured`);
      refetch();
    } catch (error) {
      console.error('Error toggling featured:', error);
    }
  };

  const handleMoveUp = async (project: Project) => {
    try {
      await updateOrder('PUT', { order: project.order - 1 }, `/projects/${project._id}/order`);
      refetch();
    } catch (error) {
      console.error('Error moving project up:', error);
    }
  };

  const handleMoveDown = async (project: Project) => {
    try {
      await updateOrder('PUT', { order: project.order + 1 }, `/projects/${project._id}/order`);
      refetch();
    } catch (error) {
      console.error('Error moving project down:', error);
    }
  };

  const addTechnology = () => {
    if (newTechnology.trim() && !formData.technologies.includes(newTechnology.trim())) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, newTechnology.trim()]
      });
      setNewTechnology('');
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter(t => t !== tech)
    });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      shortDescription: '',
      image: '',
      github: '',
      demo: '',
      category: 'Full Stack',
      technologies: [],
      featured: false,
      status: 'completed',
      startDate: '',
      endDate: '',
    });
    setNewTechnology('');
  };

  const featuredProjects = projects?.filter(p => p.featured) || [];
  const otherProjects = projects?.filter(p => !p.featured) || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Projects Management</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Project
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Close
            </button>
          )}
        </div>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
        >
          <h4 className="text-lg font-semibold text-white mb-4">
            {editingProject ? 'Edit Project' : 'Add New Project'}
          </h4>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Project Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., E-commerce Platform"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category} className="bg-gray-800">
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Detailed project description..."
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Short Description
              </label>
              <input
                type="text"
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Brief project summary..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'completed' | 'in-progress' | 'planned' })}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value} className="bg-gray-800">
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  GitHub URL
                </label>
                <input
                  type="url"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://github.com/username/repo"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Demo URL
                </label>
                <input
                  type="url"
                  value={formData.demo}
                  onChange={(e) => setFormData({ ...formData, demo: e.target.value })}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://demo.example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Technologies
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newTechnology}
                  onChange={(e) => setNewTechnology(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add technology..."
                />
                <button
                  type="button"
                  onClick={addTechnology}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTechnology(tech)}
                      className="text-blue-300 hover:text-red-300"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500"
                />
                <span className="text-gray-300">Featured Project</span>
              </label>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={creating || updating}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
              >
                {creating || updating ? 'Saving...' : (editingProject ? 'Update' : 'Create')}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingProject(null);
                  resetForm();
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400" />
            Featured Projects
          </h4>
          <div className="space-y-3">
            {featuredProjects
              .sort((a, b) => a.order - b.order)
              .map((project) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h5 className="text-white font-medium">{project.title}</h5>
                      <p className="text-gray-400 text-sm">{project.category}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-gray-500">
                          {project.views} views
                        </span>
                        <span className="text-xs text-gray-500">
                          {project.likes} likes
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                        title="View on GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                        title="View Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    <button
                      onClick={() => handleMoveUp(project)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                      title="Move up"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleMoveDown(project)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                      title="Move down"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleToggleFeatured(project._id, project.featured)}
                      className="p-2 text-yellow-400 hover:text-yellow-300 transition-colors"
                      title="Remove from featured"
                    >
                      <Star className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEdit(project)}
                      className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                      title="Edit project"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="p-2 text-red-400 hover:text-red-300 transition-colors"
                      title="Delete project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      )}

      {/* Other Projects */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h4 className="text-lg font-semibold text-white mb-4">All Projects</h4>
        {loading ? (
          <div className="text-center text-gray-400">Loading projects...</div>
        ) : otherProjects.length > 0 ? (
          <div className="space-y-3">
            {otherProjects
              .sort((a, b) => a.order - b.order)
              .map((project) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h5 className="text-white font-medium">{project.title}</h5>
                      <p className="text-gray-400 text-sm">{project.category}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-gray-500">
                          {project.views} views
                        </span>
                        <span className="text-xs text-gray-500">
                          {project.likes} likes
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                        title="View on GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                        title="View Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    <button
                      onClick={() => handleMoveUp(project)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                      title="Move up"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleMoveDown(project)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                      title="Move down"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleToggleFeatured(project._id, project.featured)}
                      className="p-2 text-gray-400 hover:text-yellow-300 transition-colors"
                      title="Add to featured"
                    >
                      <Star className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEdit(project)}
                      className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                      title="Edit project"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="p-2 text-red-400 hover:text-red-300 transition-colors"
                      title="Delete project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
          </div>
        ) : (
          <div className="text-center text-gray-400">No projects found</div>
        )}
      </div>
    </div>
  );
};

export default ProjectsManager;
