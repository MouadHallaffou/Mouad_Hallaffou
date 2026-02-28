import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";

interface SocialLink {
    id: string;
    platform: string;
    url: string;
    icon: string;
}

export default function AdminSocial() {
    const [links, setLinks] = useState<SocialLink[]>([]);
    const { register, handleSubmit, reset } = useForm<Omit<SocialLink, "id">>();

    const fetchLinks = async () => {
        try {
            const res = await api.get("/social-links");
            setLinks(res.data);
        } catch {
            toast.error("Failed to fetch social links");
        }
    };

    useEffect(() => {
        fetchLinks();
    }, []);

    const onSubmit = async (data: Omit<SocialLink, "id">) => {
        try {
            await api.post("/social-links", data);
            toast.success("Social link added!");
            reset();
            fetchLinks();
        } catch {
            toast.error("Failed to add social link");
        }
    };

    const deleteLink = async (id: string) => {
        try {
            await api.delete(`/social-links/${id}`);
            toast.success("Social link deleted");
            fetchLinks();
        } catch {
            toast.error("Failed to delete link");
        }
    };

    return (
        <div className="space-y-8 max-w-4xl">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Social Links</h1>
                <p className="text-muted-foreground">Manage your external profiles.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 border rounded-md">
                <h2 className="text-xl font-semibold">Add New Link</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Platform</label>
                        <Input {...register("platform")} placeholder="e.g. GitHub" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">URL</label>
                        <Input {...register("url")} placeholder="https://github.com/..." required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Icon Name (Lucide)</label>
                        <Input {...register("icon")} placeholder="e.g. Github" required />
                    </div>
                </div>
                <Button type="submit">Add Link</Button>
            </form>

            <div className="grid gap-4 bg-muted/20 p-6 rounded-md border">
                <h2 className="text-xl font-semibold mb-2">Existing Links</h2>
                {links.length === 0 ? <p className="text-muted-foreground text-sm">No links found.</p> : null}
                {links.map((link) => (
                    <div key={link.id} className="flex justify-between items-center bg-background p-4 border rounded-md shadow-sm">
                        <div>
                            <p className="font-semibold">{link.platform}</p>
                            <a href={link.url} target="_blank" rel="noreferrer" className="text-sm text-blue-500 hover:underline">
                                {link.url}
                            </a>
                            <p className="text-xs text-muted-foreground mt-1">Icon: {link.icon}</p>
                        </div>
                        <Button variant="destructive" size="icon" onClick={() => deleteLink(link.id)}>
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}
