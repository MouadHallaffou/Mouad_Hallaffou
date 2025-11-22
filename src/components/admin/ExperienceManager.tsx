import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X, Loader2 } from 'lucide-react';
import { experienceService } from '../../services/experienceService';
import { Experience } from '../../types/experience';
import { toast } from 'sonner';

const ExperienceManager: React.FC = () => {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Experience | null>(null);
    const [formData, setFormData] = useState<Partial<Experience>>({});

    useEffect(() => {
        fetchExperiences();
    }, []);

    const fetchExperiences = async () => {
        try {
            setLoading(true);
            const response = await experienceService.getAll();
            setExperiences(response.data || []);
        } catch (error: any) {
            toast.error(error.message || 'Failed to fetch experiences');
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setEditingItem(null);
        setFormData({
            company: '',
            position: '',
            startDate: '',
            current: false,
            employmentType: 'Full-time',
            responsibilities: [],
            achievements: [],
            technologies: [],
            isActive: true,
            order: 0
        });
        setIsModalOpen(true);
    };

    const handleEdit = (item: Experience) => {
        setEditingItem(item);
        setFormData(item);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this experience?')) return;

        try {
            await experienceService.delete(id);
            toast.success('Experience deleted successfully');
            fetchExperiences();
        } catch (error: any) {
            toast.error(error.message || 'Failed to delete experience');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (editingItem?._id) {
                await experienceService.update(editingItem._id, formData);
                toast.success('Experience updated successfully');
            } else {
                await experienceService.create(formData);
                toast.success('Experience created successfully');
            }
            setIsModalOpen(false);
            fetchExperiences();
        } catch (error: any) {
            toast.error(error.message || 'Failed to save experience');
        }
    };

    const addArrayItem = (field: 'responsibilities' | 'achievements' | 'technologies') => {
        setFormData({
            ...formData,
            [field]: [...(formData[field] || []), '']
        });
    };

    const removeArrayItem = (field: 'responsibilities' | 'achievements' | 'technologies', index: number) => {
        const newArray = [...(formData[field] || [])];
        newArray.splice(index, 1);
        setFormData({ ...formData, [field]: newArray });
    };

    const updateArrayItem = (field: 'responsibilities' | 'achievements' | 'technologies', index: number, value: string) => {
        const newArray = [...(formData[field] || [])];
        newArray[index] = value;
        setFormData({ ...formData, [field]: newArray });
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
                <h3 className="text-xl font-bold text-white">Experience Management</h3>
                <button
                    onClick={handleCreate}
                    className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Add Experience
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {experiences.map((item) => (
                    <motion.div
                        key={item._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h4 className="text-lg font-bold text-white">{item.position}</h4>
                                <p className="text-blue-300">{item.company}</p>
                                <p className="text-gray-400 text-sm">
                                    {new Date(item.startDate).getFullYear()} - {item.current ? 'Present' : item.endDate ? new Date(item.endDate).getFullYear() : 'N/A'}
                                    {' • '}{item.employmentType}
                                </p>
                                {item.technologies && item.technologies.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {item.technologies.slice(0, 5).map((tech, idx) => (
                                            <span key={idx} className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}
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
                                {editingItem ? 'Edit Experience' : 'Add Experience'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Company *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.company || ''}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Position *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.position || ''}
                                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Start Date *</label>
                                    <input
                                        type="date"
                                        required
                                        value={formData.startDate ? new Date(formData.startDate).toISOString().split('T')[0] : ''}
                                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">End Date</label>
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
                                <label htmlFor="current" className="text-sm text-gray-300">Currently working here</label>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Employment Type</label>
                                <select
                                    value={formData.employmentType || 'Full-time'}
                                    onChange={(e) => setFormData({ ...formData, employmentType: e.target.value as any })}
                                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Freelance">Freelance</option>
                                    <option value="Internship">Internship</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                                <textarea
                                    rows={3}
                                    value={formData.description || ''}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {['responsibilities', 'achievements', 'technologies'].map((field) => (
                                <div key={field}>
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="block text-sm font-medium text-gray-300 capitalize">{field}</label>
                                        <button
                                            type="button"
                                            onClick={() => addArrayItem(field as any)}
                                            className="text-sm text-blue-400 hover:text-blue-300"
                                        >
                                            + Add {field.slice(0, -1)}
                                        </button>
                                    </div>
                                    {(formData[field as keyof Experience] as string[] || []).map((item: string, index: number) => (
                                        <div key={index} className="flex gap-2 mb-2">
                                            <input
                                                type="text"
                                                placeholder={`${field.slice(0, -1)} description`}
                                                value={item}
                                                onChange={(e) => updateArrayItem(field as any, index, e.target.value)}
                                                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeArrayItem(field as any, index)}
                                                className="p-2 text-red-400 hover:text-red-300"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ))}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Order</label>
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
                                    <label htmlFor="isActive" className="text-sm text-gray-300">Active</label>
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

export default ExperienceManager;
