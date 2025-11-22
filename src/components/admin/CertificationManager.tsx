import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X, Loader2, Award } from 'lucide-react';
import { certificationService } from '../../services/certificationService';
import { Certification } from '../../types/certification';
import { toast } from 'sonner';

const CertificationManager: React.FC = () => {
    const [certifications, setCertifications] = useState<Certification[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Certification | null>(null);
    const [formData, setFormData] = useState<Partial<Certification>>({});

    useEffect(() => {
        fetchCertifications();
    }, []);

    const fetchCertifications = async () => {
        try {
            setLoading(true);
            const response = await certificationService.getAll();
            setCertifications(response.data || []);
        } catch (error: any) {
            toast.error(error.message || 'Failed to fetch certifications');
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setEditingItem(null);
        setFormData({
            name: '',
            issuer: '',
            issueDate: '',
            skills: [],
            isActive: true,
            order: 0
        });
        setIsModalOpen(true);
    };

    const handleEdit = (item: Certification) => {
        setEditingItem(item);
        setFormData(item);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this certification?')) return;

        try {
            await certificationService.delete(id);
            toast.success('Certification deleted successfully');
            fetchCertifications();
        } catch (error: any) {
            toast.error(error.message || 'Failed to delete certification');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (editingItem?._id) {
                await certificationService.update(editingItem._id, formData);
                toast.success('Certification updated successfully');
            } else {
                await certificationService.create(formData);
                toast.success('Certification created successfully');
            }
            setIsModalOpen(false);
            fetchCertifications();
        } catch (error: any) {
            toast.error(error.message || 'Failed to save certification');
        }
    };

    const addSkill = () => {
        setFormData({
            ...formData,
            skills: [...(formData.skills || []), '']
        });
    };

    const removeSkill = (index: number) => {
        const newSkills = [...(formData.skills || [])];
        newSkills.splice(index, 1);
        setFormData({ ...formData, skills: newSkills });
    };

    const updateSkill = (index: number, value: string) => {
        const newSkills = [...(formData.skills || [])];
        newSkills[index] = value;
        setFormData({ ...formData, skills: newSkills });
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
                <h3 className="text-xl font-bold text-white">Certifications Management</h3>
                <button
                    onClick={handleCreate}
                    className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Add Certification
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certifications.map((item) => (
                    <motion.div
                        key={item._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <Award className="w-5 h-5 text-yellow-400" />
                                    <h4 className="text-lg font-bold text-white">{item.name}</h4>
                                </div>
                                <p className="text-blue-300">{item.issuer}</p>
                                <p className="text-gray-400 text-sm mt-1">
                                    Issued: {new Date(item.issueDate).toLocaleDateString()}
                                </p>
                                {item.credentialId && (
                                    <p className="text-gray-400 text-xs mt-1">ID: {item.credentialId}</p>
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
                                {editingItem ? 'Edit Certification' : 'Add Certification'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Certification Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name || ''}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Issuer *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.issuer || ''}
                                    onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Issue Date *</label>
                                    <input
                                        type="date"
                                        required
                                        value={formData.issueDate ? new Date(formData.issueDate).toISOString().split('T')[0] : ''}
                                        onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Expiry Date</label>
                                    <input
                                        type="date"
                                        value={formData.expiryDate ? new Date(formData.expiryDate).toISOString().split('T')[0] : ''}
                                        onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Credential ID</label>
                                    <input
                                        type="text"
                                        value={formData.credentialId || ''}
                                        onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
                                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Credential URL</label>
                                    <input
                                        type="url"
                                        value={formData.credentialUrl || ''}
                                        onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
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

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-medium text-gray-300">Skills</label>
                                    <button
                                        type="button"
                                        onClick={addSkill}
                                        className="text-sm text-blue-400 hover:text-blue-300"
                                    >
                                        + Add Skill
                                    </button>
                                </div>
                                {formData.skills?.map((skill, index) => (
                                    <div key={index} className="flex gap-2 mb-2">
                                        <input
                                            type="text"
                                            placeholder="Skill name"
                                            value={skill}
                                            onChange={(e) => updateSkill(index, e.target.value)}
                                            className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeSkill(index)}
                                            className="p-2 text-red-400 hover:text-red-300"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
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

export default CertificationManager;
