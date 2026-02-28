import { Outlet, Link, useLocation } from "react-router-dom";
import { User, Briefcase, FileText, Settings, LogOut, Code, Award } from "lucide-react";

const navItems = [
    { icon: User, label: "Profile", href: "/admin/profile" },
    { icon: Briefcase, label: "Projects", href: "/admin/projects" },
    { icon: FileText, label: "Experience & Certs", href: "/admin/experience" },
    { icon: Code, label: "Skills", href: "/admin/skills" },
    { icon: Award, label: "Social", href: "/admin/social" },
];

export default function AdminLayout() {
    const location = useLocation();

    return (
        <div className="flex h-screen bg-gray-100/50 dark:bg-gray-900/50">
            {/* Sidebar */}
            <aside className="w-64 border-r bg-background flex flex-col">
                <div className="p-6">
                    <h2 className="text-2xl font-bold tracking-tight">Admin Panel</h2>
                    <p className="text-sm text-muted-foreground mt-1">Manage your portfolio</p>
                </div>

                <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                to={item.href}
                                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                <item.icon size={18} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 mt-auto border-t">
                    <Link
                        to="/"
                        className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <LogOut size={18} className="rotate-180" />
                        <span>Back to site</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
                <Outlet />
            </main>
        </div>
    );
}
