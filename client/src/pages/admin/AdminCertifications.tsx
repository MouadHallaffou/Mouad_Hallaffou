import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2 } from "lucide-react";

interface Certification {
    id?: string;
    title: string;
    issuer: string;
    year: string;
    description: string;
}

export default function AdminCertifications() {
    const [certifications, setCertifications] = useState<Certification[]>([]);
    const { register, handleSubmit, reset } = useForm<Certification>();

    const fetchCertifications = async () => {
        try {
            const res = await api.get("/certifications");
            setCertifications(res.data);
        } catch {
            toast.error("Failed to fetch certifications");
        }
    };

    useEffect(() => {
        fetchCertifications();
    }, []);

    const onSubmit = async (data: Certification) => {
        try {
            await api.post("/certifications", data);
            toast.success("Certification added!");
            reset();
            fetchCertifications();
        } catch {
            toast.error("Failed to add certification");
        }
    };

    const deleteCertification = async (id: string) => {
        try {
            await api.delete(`/certifications/${id}`);
            toast.success("Certification deleted");
            fetchCertifications();
        } catch {
            toast.error("Failed to delete certification");
        }
    };

    return (
        <div className="space-y-8 max-w-5xl">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Certifications</h1>
                <p className="text-muted-foreground">Manage your professional certificates.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 border rounded-md">
                <h2 className="text-xl font-semibold">Add New Certification</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <Input {...register("title")} placeholder="AWS Solutions Architect" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Issuer</label>
                        <Input {...register("issuer")} placeholder="Amazon" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Year</label>
                        <Input {...register("year")} placeholder="2024" required />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <Textarea {...register("description")} placeholder="Details about this certification..." rows={3} required />
                </div>

                <Button type="submit">Add Entry</Button>
            </form>

            <div className="grid gap-4 bg-muted/20 p-6 rounded-md border">
                <h2 className="text-xl font-semibold mb-2">Existing Entries</h2>
                {certifications.length === 0 ? <p className="text-muted-foreground text-sm">No entries found.</p> : null}

                <div className="space-y-4">
                    {certifications.map((cert) => (
                        <div key={cert.id} className="bg-background p-5 border rounded-md shadow-sm flex justify-between">
                            <div>
                                <span className="text-sm text-muted-foreground mb-1 block">
                                    {cert.year}
                                </span>
                                <h3 className="font-bold text-lg">{cert.title}</h3>
                                <p className="font-medium text-foreground/80">{cert.issuer}</p>
                                <p className="text-sm text-muted-foreground mt-2">{cert.description}</p>
                            </div>
                            <Button variant="destructive" size="icon" onClick={() => deleteCertification(cert.id!)} className="shrink-0 ml-4">
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
