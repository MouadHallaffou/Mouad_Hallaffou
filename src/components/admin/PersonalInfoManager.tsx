import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X, Loader2 } from 'lucide-react';
import { personalInfoService } from '../../services/personalInfoService';
import { PersonalInfo, Language } from '../../types/personalInfo';
import { toast } from 'sonner';

const PersonalInfoManager: React.FC = () => {
    const [personalInfo, setPersonalInfo] = useState<PersonalInfo[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<PersonalInfo | null>(null);
    const [formData, setFormData] = useState<Partial<PersonalInfo>>({});

    useEffect(() => {
        fetchPersonalInfo();
    }, []);

    const fetchPersonalInfo = async () => {
        try {
            setLoading(true);
            const response = await personalInfoService.getAll();
            setPersonalInfo(response.data || []);
        } catch (error: any) {
            toast.error(error.message || 'Failed to fetch personal info');
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setEditingItem(null);
        setFormData({
            fullName: '',
            title: '',
            bio: '',
            email: '',
            availability: 'Open to Offers',
            languages: [],
            isActive: true
        });
        setIsModalOpen(true);
    };

    const handleEdit = (item: PersonalInfo) => {
        setEditingItem(item);
        setFormData(item);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this personal info?')) return;

        try {
            await personalInfoService.delete(id);
            toast.success('Personal info deleted successfully');
            fetchPersonalInfo();
        } catch (error: any) {
            toast.error(error.message || 'Failed to delete personal info');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (editingItem?._id) {
                await personalInfoService.update(editingItem._id, formData);
                toast.success('Personal info updated successfully');
            } else {
                await personalInfoService.create(formData);
                toast.success('Personal info created successfully');
            }
            setIsModalOpen(false);
            fetchPersonalInfo();
        } catch (error: any) {
            toast.error(error.message || 'Failed to save personal info');
        }
    };

    const addLanguage = () => {
        setFormData({
            ...formData,
            languages: [...(formData.languages || []), { name: '', level: 'Intermediate' }]
        });
    };

    const removeLanguage = (index: number) => {
        const newLanguages = [...(formData.languages || [])];
        newLanguages.splice(index, 1);
        setFormData({ ...formData, languages: newLanguages });
    };

    const updateLanguage = (index: number, field: keyof Language, value: string) => {
        const newLanguages = [...(formData.languages || [])];
        newLanguages[index] = { ...newLanguages[index], [field]: value };
        setFormData({ ...formData, languages: newLanguages });
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
                <h3 className="text-xl font-bold text-white">Personal Information Management</h3>
                <button
                    onClick={handleCreate}
                    className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Add Personal Info
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {personalInfo.map((item) => (
                    <motion.div
                        key={item._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h4 className="text-lg font-bold text-white">{item.fullName}</h4>
                                <p className="text-blue-300">{item.title}</p>
                                <p className="text-gray-300 mt-2 line-clamp-2">{item.bio}</p>
                                <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
                                    <span>{item.email}</span>
                                    {item.phone && <span>{item.phone}</span>}
                                    {item.location && <span>{item.location}</span>}
                                </div>
                                <div className="mt-2">
                                    <span className={`px-3 py-1 rounded-full text-xs ${item.availability === 'Available' ? 'bg-green-500/20 text-green-300' :
                                            item.availability === 'Not Available' ? 'bg-red-500/20 text-red-300' :
                                                'bg-yellow-500/20 text-yellow-300'
                                        }`}>
                                        {item.availability}
                                    </span>
                                </div>
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
                                {editingItem ? 'Edit Personal Info' : 'Add Personal Info'}
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
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.fullName || ''}
                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Title *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.title || ''}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Tagline
                                </label>
                                <input
                                    type="text"
                                    value={formData.tagline || ''}
                                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Bio *
                                </label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.bio || ''}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email || ''}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        value={formData.phone || ''}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.location || ''}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Availability
                                    </label>
                                    <select
                                        value={formData.availability || 'Open to Offers'}
                                        onChange={(e) => setFormData({ ...formData, availability: e.target.value as any })}
                                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="Available">Available</option>
                                        <option value="Not Available">Not Available</option>
                                        <option value="Open to Offers">Open to Offers</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-medium text-gray-300">
                                        Languages
                                    </label>
                                    <button
                                        type="button"
                                        onClick={addLanguage}
                                        className="text-sm text-blue-400 hover:text-blue-300"
                                    >
                                        + Add Language
                                    </button>
                                </div>
                                {formData.languages?.map((lang, index) => (
                                    <div key={index} className="flex gap-2 mb-2">
                                        <input
                                            type="text"
                                            placeholder="Language name"
                                            value={lang.name}
                                            onChange={(e) => updateLanguage(index, 'name', e.target.value)}
                                            className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <select
                                            value={lang.level}
                                            onChange={(e) => updateLanguage(index, 'level', e.target.value)}
                                            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="Native">Native</option>
                                            <option value="Fluent">Fluent</option>
                                            <option value="Intermediate">Intermediate</option>
                                            <option value="Basic">Basic</option>
                                        </select>
                                        <button
                                            type="button"
                                            onClick={() => removeLanguage(index)}
                                            className="p-2 text-red-400 hover:text-red-300"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center gap-2">
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

export default PersonalInfoManager;
