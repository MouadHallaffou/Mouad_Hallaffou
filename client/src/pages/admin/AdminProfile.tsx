import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { api, fileApi } from "@/lib/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ProfileFormData {
    fullName: string;
    jobTitle: string;
    bio: string;
    email: string;
    phone: string;
    resumeUrl?: string;
    profilePictureUrl?: string;
}

export default function AdminProfile() {
    const [loading, setLoading] = useState(false);
    const [initialFetchDone, setInitialFetchDone] = useState(false);
    const { register, handleSubmit, reset, setValue, watch } = useForm<ProfileFormData>();
    const resumeUrl = watch("resumeUrl");
    const profilePictureUrl = watch("profilePictureUrl");

    useEffect(() => {
        async function fetchProfile() {
            try {
                const res = await api.get("/profile");
                if (res.data) {
                    reset(res.data);
                }
            } catch (error) {
                console.error("Failed to fetch profile", error);
            } finally {
                setInitialFetchDone(true);
            }
        }
        fetchProfile();
    }, [reset]);

    const onSubmit = async (data: ProfileFormData) => {
        setLoading(true);
        try {
            await api.post("/profile", data);
            toast.success("Profile saved successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to save profile.");
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fileApi.post("/files/upload", formData);
            const url = res.data.fileDownloadUri;
            setValue("resumeUrl", url);
            toast.success("Resume uploaded successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to upload resume.");
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fileApi.post("/files/upload", formData);
            const url = res.data.fileDownloadUri;
            setValue("profilePictureUrl", url);
            toast.success("Profile picture uploaded successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to upload image.");
        } finally {
            setLoading(false);
        }
    };

    if (!initialFetchDone) return <div>Loading...</div>;

    return (
        <div className="space-y-6 max-w-2xl">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Profile Details</h1>
                <p className="text-muted-foreground">Manage your personal information.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <Input {...register("fullName")} placeholder="John Doe" />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Job Title</label>
                    <Input {...register("jobTitle")} placeholder="Full Stack Developer" />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Bio</label>
                    <Textarea
                        {...register("bio")}
                        placeholder="A short description about yourself..."
                        rows={5}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <Input {...register("email")} type="email" placeholder="john@example.com" />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <Input {...register("phone")} placeholder="+1 234 567 890" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-md bg-muted/20">
                        <label className="block text-sm font-medium mb-2">Resume Upload (PDF)</label>
                        <Input type="file" accept=".pdf" onChange={handleFileUpload} disabled={loading} className="mb-2" />
                        {resumeUrl && (
                            <p className="text-sm text-green-600">
                                ✓ Resume is uploaded.
                                <br />Current URL: <a href={resumeUrl} target="_blank" rel="noreferrer" className="underline truncate block">{resumeUrl}</a>
                            </p>
                        )}
                    </div>

                    <div className="p-4 border rounded-md bg-muted/20">
                        <label className="block text-sm font-medium mb-2">Profile Picture (Image)</label>
                        <Input type="file" accept="image/*" onChange={handleImageUpload} disabled={loading} className="mb-2" />
                        {profilePictureUrl && (
                            <div className="mt-2 flex items-center gap-4">
                                <img src={profilePictureUrl} alt="Preview" className="w-12 h-12 rounded-full object-cover border" />
                                <p className="text-sm text-green-600">✓ Picture updated.</p>
                            </div>
                        )}
                    </div>
                </div>

                <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Save Profile"}
                </Button>
            </form>
        </div>
    );
}
