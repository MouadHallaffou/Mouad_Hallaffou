import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X, Loader2, Link as LinkIcon } from 'lucide-react';
import { socialLinkService } from '../../services/socialLinkService';
import { SocialLink, SocialPlatform } from '../../types/socialLink';
import { toast } from 'sonner';

const SocialLinksManager: React.FC = () => {
    const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<SocialLink | null>(null);
    const [formData, setFormData] = useState<Partial<SocialLink>>({});

    const platforms: SocialPlatform[] = [
        'GitHub',
        'LinkedIn',
        'Twitter',
        'Facebook',
        'Instagram',
        'YouTube',
        'Medium',
        'Dev.to',
        'Stack Overflow',
        'CodePen',
        'Dribbble',
        'Behance',
        'Portfolio',
        'Blog',
        'Other'
    ];

    useEffect(() => {
        fetchSocialLinks();
    }, []);

    const fetchSocialLinks = async () => {
        try {
            setLoading(true);
            const response = await socialLinkService.getAll();
            setSocialLinks(response.data || []);
        } catch (error: any) {
            toast.error(error.message || 'Failed to fetch social links');
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setEditingItem(null);
        setFormData({
            platform: 'GitHub',
            url: '',
            isActive: true,
            order: 0
        });
        setIsModalOpen(true);
    };

    const handleEdit = (item: SocialLink) => {
        setEditingItem(item);
        setFormData(item);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this social link?')) return;

        try {
            await socialLinkService.delete(id);
            toast.success('Social link deleted successfully');
            fetchSocialLinks();
        } catch (error: any) {
            toast.error(error.message || 'Failed to delete social link');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (editingItem?._id) {
                await socialLinkService.update(editingItem._id, formData);
                toast.success('Social link updated successfully');
            } else {
                await socialLinkService.create(formData);
                toast.success('Social link created successfully');
            }
            setIsModalOpen(false);
            fetchSocialLinks();
        } catch (error: any) {
            toast.error(error.message || 'Failed to save social link');
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
                <h3 className="text-xl font-bold text-white">Social Links Management</h3>
                <button
                    onClick={handleCreate}
                    className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Add Social Link
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {socialLinks.map((item) => (
                    <motion.div
                        key={item._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <LinkIcon className="w-5 h-5 text-blue-400" />
                                    <h4 className="text-lg font-bold text-white">{item.platform}</h4>
                                </div>
                                {item.username && (
                                    <p className="text-gray-300 text-sm mb-1">@{item.username}</p>
                                )}
                                <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 text-sm hover:underline truncate block"
                                >
                                    {item.url}
                                </a>
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
                                {editingItem ? 'Edit Social Link' : 'Add Social Link'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Platform *</label>
                                <select
                                    required
                                    value={formData.platform || 'GitHub'}
                                    onChange={(e) => setFormData({ ...formData, platform: e.target.value as SocialPlatform })}
                                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {platforms.map((platform) => (
                                        <option key={platform} value={platform}>{platform}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">URL *</label>
                                <input
                                    type="url"
                                    required
                                    value={formData.url || ''}
                                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                    placeholder="https://..."
                                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                                <input
                                    type="text"
                                    value={formData.username || ''}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    placeholder="Will be auto-extracted from URL if not provided"
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

export default SocialLinksManager;
