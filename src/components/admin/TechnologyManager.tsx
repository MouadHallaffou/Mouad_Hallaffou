import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X, Loader2, Code2 } from 'lucide-react';
import { technologyService } from '../../services/technologyService';
import { Technology, TechnologyCategory } from '../../types/technology';
import { toast } from 'sonner';

const TechnologyManager: React.FC = () => {
    const [technologies, setTechnologies] = useState<Technology[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Technology | null>(null);
    const [formData, setFormData] = useState<Partial<Technology>>({});

    const categories: TechnologyCategory[] = [
        'Programming Language',
        'Frontend Framework',
        'Backend Framework',
        'Database',
        'DevOps & Tools',
        'Cloud Platform',
        'Mobile Development',
        'Design & UX',
        'Testing',
        'Other'
    ];

    useEffect(() => {
        fetchTechnologies();
    }, []);

    const fetchTechnologies = async () => {
        try {
            setLoading(true);
            const response = await technologyService.getAll();
            setTechnologies(response.data || []);
        } catch (error: any) {
            toast.error(error.message || 'Failed to fetch technologies');
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setEditingItem(null);
        setFormData({
            name: '',
            category: 'Other',
            proficiency: 50,
            yearsOfExperience: 0,
            isFavorite: false,
            isActive: true,
            order: 0
        });
        setIsModalOpen(true);
    };

    const handleEdit = (item: Technology) => {
        setEditingItem(item);
        setFormData(item);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this technology?')) return;

        try {
            await technologyService.delete(id);
            toast.success('Technology deleted successfully');
            fetchTechnologies();
        } catch (error: any) {
            toast.error(error.message || 'Failed to delete technology');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (editingItem?._id) {
                await technologyService.update(editingItem._id, formData);
                toast.success('Technology updated successfully');
            } else {
                await technologyService.create(formData);
                toast.success('Technology created successfully');
            }
            setIsModalOpen(false);
            fetchTechnologies();
        } catch (error: any) {
            toast.error(error.message || 'Failed to save technology');
        }
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
                <h3 className="text-xl font-bold text-white">Technologies Management</h3>
                <button
                    onClick={handleCreate}
                    className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Add Technology
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {technologies.map((item) => (
                    <motion.div
                        key={item._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <Code2 className="w-5 h-5 text-blue-400" />
                                <h4 className="text-lg font-bold text-white">{item.name}</h4>
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
                        <p className="text-gray-400 text-sm mb-2">{item.category}</p>
                        <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                            <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${item.proficiency}%` }}
                            />
                        </div>
                        <p className="text-gray-300 text-sm">Proficiency: {item.proficiency}%</p>
                        {item.yearsOfExperience !== undefined && (
                            <p className="text-gray-400 text-xs mt-1">{item.yearsOfExperience} years experience</p>
                        )}
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
                                {editingItem ? 'Edit Technology' : 'Add Technology'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Technology Name *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name || ''}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Category *</label>
                                    <select
                                        required
                                        value={formData.category || 'Other'}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value as TechnologyCategory })}
                                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {categories.map((cat) => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Proficiency (0-100) *
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        max="100"
                                        value={formData.proficiency || 50}
                                        onChange={(e) => setFormData({ ...formData, proficiency: parseInt(e.target.value) })}
                                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Years of Experience</label>
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.5"
                                        value={formData.yearsOfExperience || 0}
                                        onChange={(e) => setFormData({ ...formData, yearsOfExperience: parseFloat(e.target.value) })}
                                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
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

                                <div className="flex flex-col gap-2 pt-8">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="isFavorite"
                                            checked={formData.isFavorite || false}
                                            onChange={(e) => setFormData({ ...formData, isFavorite: e.target.checked })}
                                            className="w-4 h-4"
                                        />
                                        <label htmlFor="isFavorite" className="text-sm text-gray-300">Favorite</label>
                                    </div>
                                    <div className="flex items-center gap-2">
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

export default TechnologyManager;
