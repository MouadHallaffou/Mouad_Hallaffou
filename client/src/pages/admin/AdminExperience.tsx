import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2 } from "lucide-react";

interface Experience {
    id: string;
    type: "ACADEMIC" | "PROFESSIONAL" | "CERTIFICATION";
    title: string;
    companyOrSchool: string;
    startDate: string;
    endDate: string;
    description: string;
}

export default function AdminExperience() {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const { register, handleSubmit, reset } = useForm<Experience>();

    const fetchExperiences = async () => {
        try {
            const res = await api.get("/experiences");
            setExperiences(res.data);
        } catch {
            toast.error("Failed to fetch experiences");
        }
    };

    useEffect(() => {
        fetchExperiences();
    }, []);

    const onSubmit = async (data: Experience) => {
        try {
            await api.post("/experiences", data);
            toast.success("Experience added!");
            reset();
            fetchExperiences();
        } catch {
            toast.error("Failed to add experience");
        }
    };

    const deleteExperience = async (id: string) => {
        try {
            await api.delete(`/experiences/${id}`);
            toast.success("Experience deleted");
            fetchExperiences();
        } catch {
            toast.error("Failed to delete experience");
        }
    };

    return (
        <div className="space-y-8 max-w-5xl">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Experience & Education</h1>
                <p className="text-muted-foreground">Manage your academic and professional timeline.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 border rounded-md">
                <h2 className="text-xl font-semibold">Add New Entry</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Type</label>
                        <select
                            {...register("type")}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            required
                        >
                            <option value="PROFESSIONAL">Professional</option>
                            <option value="ACADEMIC">Academic</option>
                            <option value="CERTIFICATION">Certification</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Title / Degree</label>
                        <Input {...register("title")} placeholder="Software Engineer" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Company / School</label>
                        <Input {...register("companyOrSchool")} placeholder="Google" required />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label className="block text-sm font-medium mb-1">Start Date</label>
                            <Input {...register("startDate")} placeholder="Jan 2020" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">End Date</label>
                            <Input {...register("endDate")} placeholder="Present" required />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <Textarea {...register("description")} placeholder="Details about this role or degree..." rows={3} required />
                </div>

                <Button type="submit">Add Entry</Button>
            </form>

            <div className="grid gap-4 bg-muted/20 p-6 rounded-md border">
                <h2 className="text-xl font-semibold mb-2">Existing Entries</h2>
                {experiences.length === 0 ? <p className="text-muted-foreground text-sm">No entries found.</p> : null}

                <div className="space-y-4">
                    {experiences.map((exp) => (
                        <div key={exp.id} className="bg-background p-5 border rounded-md shadow-sm flex justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                                        {exp.type}
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                        {exp.startDate} - {exp.endDate}
                                    </span>
                                </div>
                                <h3 className="font-bold text-lg">{exp.title}</h3>
                                <p className="font-medium text-foreground/80">{exp.companyOrSchool}</p>
                                <p className="text-sm text-muted-foreground mt-2">{exp.description}</p>
                            </div>
                            <Button variant="destructive" size="icon" onClick={() => deleteExperience(exp.id)} className="shrink-0">
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
