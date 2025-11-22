import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X, Loader2 } from 'lucide-react';
import { educationService } from '../../services/educationService';
import { Education } from '../../types/education';
import { toast } from 'sonner';

const EducationManager: React.FC = () => {
    const [education, setEducation] = useState<Education[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Education | null>(null);
    const [formData, setFormData] = useState<Partial<Education>>({});

    useEffect(() => {
        fetchEducation();
    }, []);

    const fetchEducation = async () => {
        try {
            setLoading(true);
            const response = await educationService.getAll();
            setEducation(response.data || []);
        } catch (error: any) {
            toast.error(error.message || 'Failed to fetch education');
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setEditingItem(null);
        setFormData({
            institution: '',
            degree: '',
            field: '',
            startDate: '',
            current: false,
            achievements: [],
            isActive: true,
            order: 0
        });
        setIsModalOpen(true);
    };

    const handleEdit = (item: Education) => {
        setEditingItem(item);
        setFormData(item);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this education entry?')) return;

        try {
            await educationService.delete(id);
            toast.success('Education deleted successfully');
            fetchEducation();
        } catch (error: any) {
            toast.error(error.message || 'Failed to delete education');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (editingItem?._id) {
                await educationService.update(editingItem._id, formData);
                toast.success('Education updated successfully');
            } else {
                await educationService.create(formData);
                toast.success('Education created successfully');
            }
            setIsModalOpen(false);
            fetchEducation();
        } catch (error: any) {
            toast.error(error.message || 'Failed to save education');
        }
    };

    const addAchievement = () => {
        setFormData({
            ...formData,
            achievements: [...(formData.achievements || []), '']
        });
    };

    const removeAchievement = (index: number) => {
        const newAchievements = [...(formData.achievements || [])];
        newAchievements.splice(index, 1);
        setFormData({ ...formData, achievements: newAchievements });
    };

    const updateAchievement = (index: number, value: string) => {
        const newAchievements = [...(formData.achievements || [])];
        newAchievements[index] = value;
        setFormData({ ...formData, achievements: newAchievements });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Education Management</h3>
                <button
                    onClick={handleCreate}
                    className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Add Education
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {education.map((item) => (
                    <motion.div
                        key={item._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h4 className="text-lg font-bold text-white">{item.degree}</h4>
                                <p className="text-blue-300">{item.institution}</p>
                                <p className="text-gray-400 text-sm">{item.field}</p>
                                <p className="text-gray-400 text-sm mt-2">
                                    {new Date(item.startDate).getFullYear()} - {item.current ? 'Present' : item.endDate ? new Date(item.endDate).getFullYear() : 'N/A'}
                                </p>
                                {item.grade && <p className="text-gray-300 text-sm mt-1">Grade: {item.grade}</p>}
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg transition-colors"
                                >
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(item._id!)}
                                    className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-gray-900 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-white">
                                {editingItem ? 'Edit Education' : 'Add Education'}
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-white"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Institution *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.institution || ''}
                                        onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Degree *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.degree || ''}
                                        onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Field of Study *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.field || ''}
                                    onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Start Date *
                                    </label>
                                    <input
                                        type="date"
                                        required
                                        value={formData.startDate ? new Date(formData.startDate).toISOString().split('T')[0] : ''}
                                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        End Date
                                    </label>
                                    <input
                                        type="date"
                                        disabled={formData.current}
                                        value={formData.endDate ? new Date(formData.endDate).toISOString().split('T')[0] : ''}
                                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="current"
                                    checked={formData.current || false}
                                    onChange={(e) => setFormData({ ...formData, current: e.target.checked, endDate: e.target.checked ? undefined : formData.endDate })}
                                    className="w-4 h-4"
                                />
                                <label htmlFor="current" className="text-sm text-gray-300">
                                    Currently studying here
                                </label>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Grade/GPA
                                </label>
                                <input
                                    type="text"
                                    value={formData.grade || ''}
                                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Description
                                </label>
                                <textarea
                                    rows={3}
                                    value={formData.description || ''}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-medium text-gray-300">
                                        Achievements
                                    </label>
                                    <button
                                        type="button"
                                        onClick={addAchievement}
                                        className="text-sm text-blue-400 hover:text-blue-300"
                                    >
                                        + Add Achievement
                                    </button>
                                </div>
                                {formData.achievements?.map((achievement, index) => (
                                    <div key={index} className="flex gap-2 mb-2">
                                        <input
                                            type="text"
                                            placeholder="Achievement description"
                                            value={achievement}
                                            onChange={(e) => updateAchievement(index, e.target.value)}
                                            className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeAchievement(index)}
                                            className="p-2 text-red-400 hover:text-red-300"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Order
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.order || 0}
                                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="flex items-center gap-2 pt-8">
                                    <input
                                        type="checkbox"
                                        id="isActive"
                                        checked={formData.isActive !== false}
                                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                        className="w-4 h-4"
                                    />
                                    <label htmlFor="isActive" className="text-sm text-gray-300">
                                        Active
                                    </label>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
                                >
                                    <Save className="w-5 h-5" />
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default EducationManager;
