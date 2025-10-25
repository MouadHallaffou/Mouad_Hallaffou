import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  BarChart3,
  Users,
  MessageSquare,
  Code,
  Briefcase,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  User,
  Mail,
  Eye,
  TrendingUp,
  Calendar,
  Star
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useApi } from '../hooks/useApi';
import SkillsManager from '../components/admin/SkillsManager';
import ProjectsManager from '../components/admin/ProjectsManager';

interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  adminUsers: number;
  recentUsers: number;
}

interface MessageStats {
  total: number;
  new: number;
  read: number;
  replied: number;
  archived: number;
  today: number;
  thisWeek: number;
  thisMonth: number;
}

const AdminDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  // Fetch dashboard data
  const { data: userStats, loading: userStatsLoading } = useApi<DashboardStats>('/user/stats/overview');
  const { data: messageStats, loading: messageStatsLoading } = useApi<MessageStats>('/messages/stats/overview');
  const { data: skills, loading: skillsLoading } = useApi('/skills');
  const { data: projects, loading: projectsLoading } = useApi('/projects');

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
    loading?: boolean;
  }> = ({ title, value, icon, color, loading }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-300 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-white mt-2">
            {loading ? '...' : value}
          </p>
        </div>
        <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={userStats?.totalUsers || 0}
          icon={<Users className="w-6 h-6 text-white" />}
          color="bg-gradient-to-r from-blue-500 to-blue-600"
          loading={userStatsLoading}
        />
        <StatCard
          title="Active Users"
          value={userStats?.activeUsers || 0}
          icon={<TrendingUp className="w-6 h-6 text-white" />}
          color="bg-gradient-to-r from-green-500 to-green-600"
          loading={userStatsLoading}
        />
        <StatCard
          title="New Messages"
          value={messageStats?.new || 0}
          icon={<MessageSquare className="w-6 h-6 text-white" />}
          color="bg-gradient-to-r from-purple-500 to-purple-600"
          loading={messageStatsLoading}
        />
        <StatCard
          title="Total Projects"
          value={projects?.length || 0}
          icon={<Briefcase className="w-6 h-6 text-white" />}
          color="bg-gradient-to-r from-orange-500 to-orange-600"
          loading={projectsLoading}
        />
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
      >
        <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
            <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-white font-medium">New message received</p>
              <p className="text-gray-400 text-sm">2 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
            <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
              <Code className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-white font-medium">Skill updated</p>
              <p className="text-gray-400 text-sm">1 hour ago</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
            <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-white font-medium">New project added</p>
              <p className="text-gray-400 text-sm">3 hours ago</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const SkillsTab = () => <SkillsManager />;

  const ProjectsTab = () => <ProjectsManager />;

  const MessagesTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Messages Management</h3>
        <div className="flex gap-2">
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors">
            Mark All Read
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
            Reply All
          </button>
        </div>
      </div>
      
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <p className="text-gray-300">Messages management interface will be implemented here.</p>
        <p className="text-gray-400 text-sm mt-2">New messages: {messageStats?.new || 0}</p>
      </div>
    </div>
  );

  const UsersTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Users Management</h3>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
          Add User
        </button>
      </div>
      
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <p className="text-gray-300">Users management interface will be implemented here.</p>
        <p className="text-gray-400 text-sm mt-2">Total users: {userStats?.totalUsers || 0}</p>
      </div>
    </div>
  );

  const SettingsTab = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white">Settings</h3>
      
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <p className="text-gray-300">Settings interface will be implemented here.</p>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'skills':
        return <SkillsTab />;
      case 'projects':
        return <ProjectsTab />;
      case 'messages':
        return <MessagesTab />;
      case 'users':
        return <UsersTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <OverviewTab />;
    }
  };

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 h-full w-64 bg-white/10 backdrop-blur-lg border-r border-white/20 z-50 lg:translate-x-0 lg:static lg:z-auto"
      >
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">Admin Panel</h1>
          </div>

          {/* User Info */}
          <div className="mb-8 p-4 bg-white/5 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-medium">{user?.name}</p>
                <p className="text-gray-400 text-sm">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-300 hover:bg-red-500/20 hover:text-red-200 transition-colors mt-8"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-white/5 backdrop-blur-lg border-b border-white/20 p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-white"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-bold text-white capitalize">
                {menuItems.find(item => item.id === activeTab)?.label}
              </h2>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-white font-medium">{user?.name}</p>
                <p className="text-gray-400 text-sm">Administrator</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 lg:p-6">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderTabContent()}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
