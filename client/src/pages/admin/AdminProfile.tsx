import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { api, fileApi } from "@/lib/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Stat { label: string; value: string; icon?: string; }
interface SocialLink { platform: string; url: string; icon?: string; }
interface Tech { name: string; icon?: string; url?: string; }
interface Contact { email: string; phone: string; location: string; socialLinks: SocialLink[]; }

interface ProfileFormData {
    name: string;
    title: string;
    subtitle: string;
    availability: string;
    shortBio: string;
    longBio: string;
    avatarUrl: string;
    stats: Stat[];
    personalTraits: string; // we will parse this to string[] on submit, or handle as array
    contact: Contact;
    techStack: Tech[];
}

export default function AdminProfile() {
    const [loading, setLoading] = useState(false);
    const [initialFetchDone, setInitialFetchDone] = useState(false);
    const [profileId, setProfileId] = useState<string | null>(null);

    // We treat personalTraits as a comma-separated string in the form
    const { register, control, handleSubmit, reset, setValue, watch } = useForm<ProfileFormData>({
        defaultValues: {
            stats: [],
            techStack: [],
            contact: { email: "", phone: "", location: "", socialLinks: [] },
            personalTraits: "",
        }
    });

    const { fields: statFields, append: appendStat, remove: removeStat } = useFieldArray({ control, name: "stats" });
    const { fields: techFields, append: appendTech, remove: removeTech } = useFieldArray({ control, name: "techStack" });
    const { fields: socialFields, append: appendSocial, remove: removeSocial } = useFieldArray({ control, name: "contact.socialLinks" });

    const avatarUrl = watch("avatarUrl");

    useEffect(() => {
        async function fetchProfile() {
            try {
                const res = await api.get("/profile");
                if (res.data) {
                    setProfileId(res.data.id);
                    // Map arrays safely
                    const data = {
                        ...res.data,
                        personalTraits: res.data.personalTraits?.join(", ") || "",
                        stats: res.data.stats || [],
                        techStack: res.data.techStack || [],
                        contact: res.data.contact || { email: "", phone: "", location: "", socialLinks: [] }
                    };
                    reset(data);
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
            const payload = {
                ...data,
                personalTraits: data.personalTraits.split(",").map(s => s.trim()).filter(Boolean)
            };

            if (profileId) {
                await api.put(`/profile/${profileId}`, payload);
            } else {
                const res = await api.post("/profile", payload);
                setProfileId(res.data.id);
            }
            toast.success("Profile saved successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to save profile.");
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
            const res = await fileApi.post("/files/upload/profile", formData);
            const url = res.data.fileDownloadUri;
            setValue("avatarUrl", url);
            toast.success("Profile picture uploaded successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to upload image.");
        } finally {
            setLoading(false);
        }
    };

    if (!initialFetchDone) return <div className="p-8">Loading profile...</div>;

    return (
        <div className="space-y-8 max-w-4xl pb-10">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Main Profile</h1>
                <p className="text-muted-foreground">Manage your core identity and portfolio hero section.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Basic Info */}
                <section className="space-y-4 p-6 border rounded-lg bg-card text-card-foreground shadow-sm">
                    <h2 className="text-xl font-semibold">Basic Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Name</label>
                            <Input {...register("name")} placeholder="Mouad Hallaffou" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Title</label>
                            <Input {...register("title")} placeholder="Full Stack Developer" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1">Subtitle</label>
                            <Input {...register("subtitle")} placeholder="Java/Angular | PHP/Laravel..." />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Availability</label>
                            <Input {...register("availability")} placeholder="Available for new opportunities" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Short Bio</label>
                        <Textarea {...register("shortBio")} placeholder="Crafting digital experiences..." rows={3} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Long Bio</label>
                        <Textarea {...register("longBio")} placeholder="I'm a passionate Full Stack..." rows={6} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Personal Traits (comma separated)</label>
                        <Input {...register("personalTraits")} placeholder="Problem Solver, Team Player, Adaptable" />
                    </div>

                    <div className="p-4 border rounded-md bg-muted/20 mt-4">
                        <label className="block text-sm font-medium mb-2">Avatar Upload</label>
                        <Input type="file" accept="image/*" onChange={handleImageUpload} disabled={loading} className="mb-2" />
                        {avatarUrl && (
                            <div className="mt-2 flex items-center gap-4">
                                <img src={avatarUrl} alt="Preview" className="w-16 h-16 rounded-full object-cover border" />
                                <p className="text-sm text-green-600">✓ Avatar URL matches.</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Contact Info */}
                <section className="space-y-4 p-6 border rounded-lg bg-card text-card-foreground shadow-sm">
                    <h2 className="text-xl font-semibold">Contact Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <Input {...register("contact.email")} type="email" placeholder="email@example.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Phone</label>
                            <Input {...register("contact.phone")} placeholder="+212 ..." />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Location</label>
                            <Input {...register("contact.location")} placeholder="Safi, Morocco" />
                        </div>
                    </div>

                    {/* Social Links inside Contact */}
                    <div className="mt-4">
                        <h3 className="text-lg font-medium mb-2">Social Links</h3>
                        {socialFields.map((field, index) => (
                            <div key={field.id} className="flex gap-2 mb-2 items-end">
                                <div className="flex-1 text-sm">
                                    <label>Platform</label>
                                    <Input {...register(`contact.socialLinks.${index}.platform`)} placeholder="GitHub" />
                                </div>
                                <div className="flex-[2] text-sm">
                                    <label>URL</label>
                                    <Input {...register(`contact.socialLinks.${index}.url`)} placeholder="https://..." />
                                </div>
                                <div className="flex-1 text-sm">
                                    <label>Icon</label>
                                    <Input {...register(`contact.socialLinks.${index}.icon`)} placeholder="github" />
                                </div>
                                <Button type="button" variant="destructive" onClick={() => removeSocial(index)}>Remove</Button>
                            </div>
                        ))}
                        <Button type="button" variant="outline" onClick={() => appendSocial({ platform: "", url: "", icon: "" })}>Add Social Link</Button>
                    </div>
                </section>

                {/* Stats */}
                <section className="space-y-4 p-6 border rounded-lg bg-card text-card-foreground shadow-sm">
                    <h2 className="text-xl font-semibold">Statistics</h2>
                    {statFields.map((field, index) => (
                        <div key={field.id} className="flex gap-2 mb-2 items-end">
                            <div className="flex-1 text-sm">
                                <label>Label</label>
                                <Input {...register(`stats.${index}.label`)} placeholder="Years of Experience" />
                            </div>
                            <div className="flex-1 text-sm">
                                <label>Value</label>
                                <Input {...register(`stats.${index}.value`)} placeholder="1+" />
                            </div>
                            <div className="flex-1 text-sm">
                                <label>Icon</label>
                                <Input {...register(`stats.${index}.icon`)} placeholder="optional" />
                            </div>
                            <Button type="button" variant="destructive" onClick={() => removeStat(index)}>Remove</Button>
                        </div>
                    ))}
                    <Button type="button" variant="outline" onClick={() => appendStat({ label: "", value: "", icon: "" })}>Add Stat</Button>
                </section>

                {/* Tech Stack */}
                <section className="space-y-4 p-6 border rounded-lg bg-card text-card-foreground shadow-sm">
                    <h2 className="text-xl font-semibold">Tech Stack (Hero section)</h2>
                    {techFields.map((field, index) => (
                        <div key={field.id} className="flex gap-2 mb-2 items-end">
                            <div className="flex-1 text-sm">
                                <label>Name</label>
                                <Input {...register(`techStack.${index}.name`)} placeholder="React" />
                            </div>
                            <div className="flex-1 text-sm">
                                <label>Icon</label>
                                <Input {...register(`techStack.${index}.icon`)} placeholder="react" />
                            </div>
                            <div className="flex-1 text-sm">
                                <label>URL</label>
                                <Input {...register(`techStack.${index}.url`)} placeholder="https://..." />
                            </div>
                            <Button type="button" variant="destructive" onClick={() => removeTech(index)}>Remove</Button>
                        </div>
                    ))}
                    <Button type="button" variant="outline" onClick={() => appendTech({ name: "", icon: "", url: "" })}>Add Tech</Button>
                </section>

                <Button type="submit" disabled={loading} className="w-full sm:w-auto text-lg py-6 px-10">
                    {loading ? "Saving Profile..." : "Save All Profile Data"}
                </Button>
            </form>
        </div>
    );
}
