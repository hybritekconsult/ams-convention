"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterInput } from "@/lib/validations/register";
import { registerAttendee } from "@/app/actions/register";
import { Button } from "@/components/ui/button";

export function RegistrationForm() {
  const [serverSuccess, setServerSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (values: RegisterInput) => {
    setServerError(null);
    const response = await registerAttendee(values);
    if (response.success) {
      setServerSuccess(true);
    } else if (response.errors) {
      Object.entries(response.errors).forEach(([field, messages]) => {
        setError(field as keyof RegisterInput, { message: messages[0] });
      });
    } else {
      setServerError(response.message);
    }
  };

  if (serverSuccess) {
    return (
      <div className="rounded-xl border-2 border-brand-gold bg-brand-gold/10 p-8 text-center">
        <div className="text-4xl mb-4">🙏</div>
        <h2 className="font-heading text-brand-gold uppercase text-2xl font-bold mb-3">
          Registration Confirmed!
        </h2>
        <p className="text-brand-cream/80 text-base leading-relaxed">
          Thank you for registering. We look forward to welcoming you in Amsterdam.
          God bless you.
        </p>
      </div>
    );
  }

  const textFields: Array<{ id: keyof RegisterInput; label: string; type?: string; placeholder?: string }> = [
    { id: "fullName",  label: "Full Name",     placeholder: "e.g. John Okafor" },
    { id: "email",     label: "Email Address", type: "email", placeholder: "you@example.com" },
    { id: "phone",     label: "Phone Number",  type: "tel",   placeholder: "+31 6 12345678" },
    { id: "country",   label: "Country",       placeholder: "Netherlands" },
    { id: "city",      label: "City",          placeholder: "Amsterdam" },
  ];

  const inputBase =
    "w-full rounded-lg px-4 py-3 bg-white/10 border border-brand-cream/30 text-brand-cream text-base placeholder:text-brand-cream/30 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition";

  const labelBase = "block text-brand-cream font-heading uppercase text-xs tracking-widest mb-1.5";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      {textFields.map(({ id, label, type = "text", placeholder }) => (
        <div key={id}>
          <label htmlFor={id} className={labelBase}>
            {label}
          </label>
          <input
            id={id}
            type={type}
            placeholder={placeholder}
            aria-describedby={errors[id] ? `${id}-error` : undefined}
            aria-invalid={!!errors[id]}
            {...register(id)}
            className={inputBase}
          />
          {errors[id] && (
            <p id={`${id}-error`} role="alert" className="text-red-400 text-xs mt-1">
              {errors[id]?.message}
            </p>
          )}
        </div>
      ))}

      {/* Attendance Type */}
      <div>
        <label htmlFor="attendanceType" className={labelBase}>
          I will attend
        </label>
        <select
          id="attendanceType"
          aria-describedby={errors.attendanceType ? "attendanceType-error" : undefined}
          aria-invalid={!!errors.attendanceType}
          {...register("attendanceType")}
          className={`${inputBase} appearance-none cursor-pointer`}
        >
          <option value="" className="bg-brand-navy text-brand-cream">
            Select attendance type
          </option>
          <option value="FULL_CONVENTION" className="bg-brand-navy text-brand-cream">
            Full Convention (In-Person)
          </option>
          <option value="CONSULTATION_ONLY" className="bg-brand-navy text-brand-cream">
            Consultation Only (12:00–18:00)
          </option>
          <option value="HOLY_MASS_ONLY" className="bg-brand-navy text-brand-cream">
            Holy Mass &amp; Adoration (18:00–22:00)
          </option>
        </select>
        {errors.attendanceType && (
          <p id="attendanceType-error" role="alert" className="text-red-400 text-xs mt-1">
            {errors.attendanceType.message}
          </p>
        )}
      </div>

      {/* General server error */}
      {serverError && (
        <div
          role="alert"
          className="rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-3 text-red-400 text-sm"
        >
          {serverError}
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isSubmitting}
        className="w-full mt-2 py-4 text-base"
      >
        Confirm My Registration
      </Button>

      <p className="text-brand-cream/40 text-xs text-center">
        Free event · No payment required
      </p>
    </form>
  );
}
