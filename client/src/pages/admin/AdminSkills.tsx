import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";

interface Skill {
    id: string;
    name: string;
    category: string;
    icon?: string;
}

export default function AdminSkills() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const { register, handleSubmit, reset } = useForm<Omit<Skill, "id">>();

    const fetchSkills = async () => {
        try {
            const res = await api.get("/skills");
            setSkills(res.data);
        } catch {
            toast.error("Failed to fetch skills");
        }
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    const onSubmit = async (data: Omit<Skill, "id">) => {
        try {
            await api.post("/skills", data);
            toast.success("Skill added!");
            reset();
            fetchSkills();
        } catch {
            toast.error("Failed to add skill");
        }
    };

    const deleteSkill = async (id: string) => {
        try {
            await api.delete(`/skills/${id}`);
            toast.success("Skill deleted");
            fetchSkills();
        } catch {
            toast.error("Failed to delete skill");
        }
    };

    return (
        <div className="space-y-8 max-w-4xl">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Skills & Technologies</h1>
                <p className="text-muted-foreground">Manage your technical skills.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 border rounded-md">
                <h2 className="text-xl font-semibold">Add New Skill</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <Input {...register("name")} placeholder="e.g. React" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Category</label>
                        <Input {...register("category")} placeholder="e.g. Frontend" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Icon Name/URL</label>
                        <Input {...register("icon")} placeholder="Optional" />
                    </div>
                </div>
                <Button type="submit">Add Skill</Button>
            </form>

            <div className="grid gap-4 bg-muted/20 p-6 rounded-md border">
                <h2 className="text-xl font-semibold mb-2">Existing Skills</h2>
                {skills.length === 0 ? <p className="text-muted-foreground text-sm">No skills found.</p> : null}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {skills.map((skill) => (
                        <div key={skill.id} className="flex justify-between items-start bg-background p-4 border rounded-md shadow-sm">
                            <div>
                                <p className="font-semibold">{skill.name}</p>
                                <p className="text-xs text-muted-foreground">{skill.category}</p>
                            </div>
                            <Button variant="destructive" size="sm" onClick={() => deleteSkill(skill.id)}>
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
