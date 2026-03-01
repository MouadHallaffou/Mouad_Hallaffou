import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2 } from "lucide-react";

interface Education {
    id?: string;
    title: string;
    institution: string;
    date: string;
    description: string;
}

export default function AdminEducation() {
    const [educations, setEducations] = useState<Education[]>([]);
    const { register, handleSubmit, reset } = useForm<Education>();

    const fetchEducations = async () => {
        try {
            const res = await api.get("/education");
            setEducations(res.data);
        } catch {
            toast.error("Failed to fetch education records");
        }
    };

    useEffect(() => {
        fetchEducations();
    }, []);

    const onSubmit = async (data: Education) => {
        try {
            await api.post("/education", data);
            toast.success("Education added!");
            reset();
            fetchEducations();
        } catch {
            toast.error("Failed to add education");
        }
    };

    const deleteEducation = async (id: string) => {
        try {
            await api.delete(`/education/${id}`);
            toast.success("Education deleted");
            fetchEducations();
        } catch {
            toast.error("Failed to delete education");
        }
    };

    return (
        <div className="space-y-8 max-w-5xl">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Education</h1>
                <p className="text-muted-foreground">Manage your academic journey.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 border rounded-md">
                <h2 className="text-xl font-semibold">Add New Education</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Title / Degree</label>
                        <Input {...register("title")} placeholder="Bachelor of Science in CS" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Institution</label>
                        <Input {...register("institution")} placeholder="MIT" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Date</label>
                        <Input {...register("date")} placeholder="2020 - 2024" required />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <Textarea {...register("description")} placeholder="Details about this degree..." rows={3} required />
                </div>

                <Button type="submit">Add Entry</Button>
            </form>

            <div className="grid gap-4 bg-muted/20 p-6 rounded-md border">
                <h2 className="text-xl font-semibold mb-2">Existing Entries</h2>
                {educations.length === 0 ? <p className="text-muted-foreground text-sm">No entries found.</p> : null}

                <div className="space-y-4">
                    {educations.map((edu) => (
                        <div key={edu.id} className="bg-background p-5 border rounded-md shadow-sm flex justify-between">
                            <div>
                                <span className="text-sm text-muted-foreground mb-1 block">
                                    {edu.date}
                                </span>
                                <h3 className="font-bold text-lg">{edu.title}</h3>
                                <p className="font-medium text-foreground/80">{edu.institution}</p>
                                <p className="text-sm text-muted-foreground mt-2">{edu.description}</p>
                            </div>
                            <Button variant="destructive" size="icon" onClick={() => deleteEducation(edu.id!)} className="shrink-0 ml-4">
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
