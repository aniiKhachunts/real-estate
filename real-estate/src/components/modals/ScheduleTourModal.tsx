import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const Schema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(6),
    date: z.string().min(1),
    time: z.string().min(1),
    message: z.string().optional(),
});
type Form = z.infer<typeof Schema>;

export default function ScheduleTourModal({
                                              open, onClose, propertyId, onSubmitLead,
                                          }: {
    open: boolean;
    onClose: () => void;
    propertyId: string;
    onSubmitLead: (payload: { propertyId: string } & Form) => Promise<void> | void;
}) {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<Form>({
        resolver: zodResolver(Schema),
    });

    if (!open) return null;

    return (
        <div role="dialog" aria-modal className="fixed inset-0 z-50 bg-black/50 grid place-items-center p-4">
            <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
                <div className="p-4 border-b flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Schedule a tour</h3>
                    <button onClick={onClose} className="text-slate-600 hover:text-slate-900">✕</button>
                </div>
                <form
                    onSubmit={handleSubmit(async (data) => {
                        await onSubmitLead({ propertyId, ...data });
                        reset();
                        onClose();
                        alert("Thanks! We’ll reach out shortly.");
                    })}
                    className="p-4 grid gap-3"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="text-sm text-slate-600">Name</label>
                            <input className="w-full h-10 rounded-lg border px-3" {...register("name")} />
                            {errors.name && <p className="text-xs text-rose-600 mt-1">{errors.name.message}</p>}
                        </div>
                        <div>
                            <label className="text-sm text-slate-600">Email</label>
                            <input className="w-full h-10 rounded-lg border px-3" {...register("email")} />
                            {errors.email && <p className="text-xs text-rose-600 mt-1">{errors.email.message}</p>}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="text-sm text-slate-600">Phone</label>
                            <input className="w-full h-10 rounded-lg border px-3" {...register("phone")} />
                            {errors.phone && <p className="text-xs text-rose-600 mt-1">{errors.phone.message}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-sm text-slate-600">Date</label>
                                <input type="date"
                                       className="w-full h-10 rounded-lg border px-3" {...register("date")} />
                                {errors.date && <p className="text-xs text-rose-600 mt-1">{errors.date.message}</p>}
                            </div>
                            <div>
                                <label className="text-sm text-slate-600">Time</label>
                                <input type="time"
                                       className="w-full h-10 rounded-lg border px-3" {...register("time")} />
                                {errors.time && <p className="text-xs text-rose-600 mt-1">{errors.time.message}</p>}
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="text-sm text-slate-600">Message (optional)</label>
                        <textarea rows={3} className="w-full rounded-lg border px-3 py-2" {...register("message")} />
                    </div>
                    <button disabled={isSubmitting}
                            className="h-11 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-medium">
                        {isSubmitting ? "Sending…" : "Request tour"}
                    </button>
                </form>
            </div>
        </div>
    );
}
