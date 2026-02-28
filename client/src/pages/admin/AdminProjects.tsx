import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2 } from "lucide-react";

interface Project {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    repoUrl?: string;
    liveUrl?: string;
    tags?: string[];
}

export default function AdminProjects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const { register, handleSubmit, reset } = useForm<Project>();

    const fetchProjects = async () => {
        try {
            const res = await api.get("/projects");
            setProjects(res.data);
        } catch {
            toast.error("Failed to fetch projects");
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const onSubmit = async (data: Project) => {
        try {
            // Convert tags comma separated string to array if needed.
            // Assuming user inputs tags like "react, node, typescript"
            const tagsString = (data.tags as any) as string;
            const tagsArray = tagsString ? tagsString.split(",").map((t) => t.trim()) : [];

            const projectPayload = {
                ...data,
                tags: tagsArray
            };

            await api.post("/projects", projectPayload);
            toast.success("Project added successfully!");
            reset();
            fetchProjects();
        } catch {
            toast.error("Failed to add project");
        }
    };

    const deleteProject = async (id: string) => {
        try {
            await api.delete(`/projects/${id}`);
            toast.success("Project deleted");
            fetchProjects();
        } catch {
            toast.error("Failed to delete project");
        }
    };

    return (
        <div className="space-y-8 max-w-5xl">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
                <p className="text-muted-foreground">Manage your portfolio projects.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 border rounded-md">
                <h2 className="text-xl font-semibold">Add New Project</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <Input {...register("title")} placeholder="Project Title" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Image URL</label>
                        <Input {...register("imageUrl")} placeholder="https://..." />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Repo URL</label>
                        <Input {...register("repoUrl")} placeholder="https://github.com/..." />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Live URL</label>
                        <Input {...register("liveUrl")} placeholder="https://..." />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <Textarea {...register("description")} placeholder="Project details..." rows={4} required />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
                    <Input {...register("tags" as any)} placeholder="React, Spring Boot, MySQL" />
                </div>

                <Button type="submit">Add Project</Button>
            </form>

            <div className="grid gap-4 bg-muted/20 p-6 rounded-md border">
                <h2 className="text-xl font-semibold mb-2">Existing Projects</h2>
                {projects.length === 0 ? <p className="text-muted-foreground text-sm">No projects found.</p> : null}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((proj) => (
                        <div key={proj.id} className="bg-background p-5 border rounded-md shadow-sm flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-lg">{proj.title}</h3>
                                    <Button variant="destructive" size="sm" onClick={() => deleteProject(proj.id)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{proj.description}</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {proj.tags?.map((tag, i) => (
                                        <span key={i} className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-md">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex gap-4 text-sm text-blue-500">
                                {proj.repoUrl && <a href={proj.repoUrl} target="_blank" rel="noreferrer" className="hover:underline">Repository</a>}
                                {proj.liveUrl && <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="hover:underline">Live Site</a>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
