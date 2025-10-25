import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, EyeOff, ArrowUp, ArrowDown } from 'lucide-react';
import { useApi, useApiMutation } from '../../hooks/useApi';

interface Skill {
  _id: string;
  name: string;
  category: string;
  level: number;
  icon: string;
  color: string;
  description?: string;
  isActive: boolean;
  order: number;
}

interface SkillsManagerProps {
  onClose?: () => void;
}

const SkillsManager: React.FC<SkillsManagerProps> = ({ onClose }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Frontend Development',
    level: 50,
    icon: 'Code',
    color: 'from-blue-500 to-cyan-500',
    description: '',
  });

  const { data: skills, loading, refetch } = useApi<Skill[]>('/skills');
  const { mutate: createSkill, loading: creating } = useApiMutation('/skills');
  const { mutate: updateSkill, loading: updating } = useApiMutation('/skills');
  const { mutate: deleteSkill, loading: deleting } = useApiMutation('/skills');
  const { mutate: toggleSkill } = useApiMutation('/skills');
  const { mutate: updateOrder } = useApiMutation('/skills');

  const categories = [
    'Frontend Development',
    'Backend Development',
    'DevOps & Tools',
    'Design & UX',
    'Mobile Development',
    'Other'
  ];

  const colorOptions = [
    'from-blue-500 to-cyan-500',
    'from-green-500 to-emerald-500',
    'from-purple-500 to-pink-500',
    'from-orange-500 to-red-500',
    'from-yellow-500 to-orange-500',
    'from-indigo-500 to-purple-500',
    'from-pink-500 to-rose-500',
    'from-teal-500 to-cyan-500',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingSkill) {
        await updateSkill('PUT', formData, `/skills/${editingSkill._id}`);
      } else {
        await createSkill('POST', formData);
      }
      
      setShowForm(false);
      setEditingSkill(null);
      setFormData({
        name: '',
        category: 'Frontend Development',
        level: 50,
        icon: 'Code',
        color: 'from-blue-500 to-cyan-500',
        description: '',
      });
      refetch();
    } catch (error) {
      console.error('Error saving skill:', error);
    }
  };

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      category: skill.category,
      level: skill.level,
      icon: skill.icon,
      color: skill.color,
      description: skill.description || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (skillId: string) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await deleteSkill('DELETE', undefined, `/skills/${skillId}`);
        refetch();
      } catch (error) {
        console.error('Error deleting skill:', error);
      }
    }
  };

  const handleToggleActive = async (skillId: string, isActive: boolean) => {
    try {
      await toggleSkill('PUT', { isActive: !isActive }, `/skills/${skillId}/toggle`);
      refetch();
    } catch (error) {
      console.error('Error toggling skill:', error);
    }
  };

  const handleMoveUp = async (skill: Skill) => {
    try {
      await updateOrder('PUT', { order: skill.order - 1 }, `/skills/${skill._id}/order`);
      refetch();
    } catch (error) {
      console.error('Error moving skill up:', error);
    }
  };

  const handleMoveDown = async (skill: Skill) => {
    try {
      await updateOrder('PUT', { order: skill.order + 1 }, `/skills/${skill._id}/order`);
      refetch();
    } catch (error) {
      console.error('Error moving skill down:', error);
    }
  };

  const groupedSkills = skills?.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Skills Management</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Skill
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
            {editingSkill ? 'Edit Skill' : 'Add New Skill'}
          </h4>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Skill Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., React"
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Level ({formData.level}%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Color
                </label>
                <div className="flex gap-2 flex-wrap">
                  {colorOptions.map(color => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setFormData({ ...formData, color })}
                      className={`w-8 h-8 rounded-lg bg-gradient-to-r ${color} ${
                        formData.color === color ? 'ring-2 ring-white' : ''
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description (Optional)
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Brief description of the skill"
                rows={3}
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={creating || updating}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
              >
                {creating || updating ? 'Saving...' : (editingSkill ? 'Update' : 'Create')}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingSkill(null);
                  setFormData({
                    name: '',
                    category: 'Frontend Development',
                    level: 50,
                    icon: 'Code',
                    color: 'from-blue-500 to-cyan-500',
                    description: '',
                  });
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Skills List */}
      <div className="space-y-6">
        {loading ? (
          <div className="text-center text-gray-400">Loading skills...</div>
        ) : groupedSkills ? (
          Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h4 className="text-lg font-semibold text-white mb-4">{category}</h4>
              <div className="space-y-3">
                {categorySkills
                  .sort((a, b) => a.order - b.order)
                  .map((skill) => (
                    <motion.div
                      key={skill._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${skill.color} flex items-center justify-center`}>
                          <span className="text-white font-bold text-sm">
                            {skill.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h5 className="text-white font-medium">{skill.name}</h5>
                          <p className="text-gray-400 text-sm">{skill.level}%</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleMoveUp(skill)}
                          className="p-2 text-gray-400 hover:text-white transition-colors"
                          title="Move up"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleMoveDown(skill)}
                          className="p-2 text-gray-400 hover:text-white transition-colors"
                          title="Move down"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleToggleActive(skill._id, skill.isActive)}
                          className={`p-2 transition-colors ${
                            skill.isActive ? 'text-green-400 hover:text-green-300' : 'text-gray-400 hover:text-gray-300'
                          }`}
                          title={skill.isActive ? 'Hide skill' : 'Show skill'}
                        >
                          {skill.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => handleEdit(skill)}
                          className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                          title="Edit skill"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(skill._id)}
                          className="p-2 text-red-400 hover:text-red-300 transition-colors"
                          title="Delete skill"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400">No skills found</div>
        )}
      </div>
    </div>
  );
};

export default SkillsManager;
