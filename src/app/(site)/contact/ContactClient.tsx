"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUpRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

type FormData = {
  name: string;
  email: string;
  phone: string;
  city: string;
  projectType: string;
  message: string;
};

const INITIAL: FormData = { name: "", email: "", phone: "", city: "", projectType: "", message: "" };

export function ContactClient() {
  const [formData, setFormData] = useState<FormData>(INITIAL);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setStatus("success");
      setFormData(INITIAL);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to send. Please try again.");
    }
  };

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="bg-card rounded-2xl p-6 md:p-8 border border-border">
      <h2 className="font-display text-2xl font-bold text-foreground mb-6">Send a Message</h2>

      {status === "success" && (
        <div className="flex items-start gap-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 mb-6">
          <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
          <p className="text-sm text-green-800 dark:text-green-300 font-medium">
            Message sent! We&apos;ll get back to you within 24 hours.
          </p>
        </div>
      )}

      {status === "error" && (
        <div className="flex items-start gap-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
          <p className="text-sm text-red-800 dark:text-red-300 font-medium">{errorMsg}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid md:grid-cols-2 gap-5">
          <Input
            placeholder="Your Name *"
            value={formData.name}
            onChange={set("name")}
            required
            disabled={status === "loading"}
            className="h-12 rounded-xl bg-background border-border"
          />
          <Input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={set("email")}
            disabled={status === "loading"}
            className="h-12 rounded-xl bg-background border-border"
          />
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          <Input
            placeholder="Phone Number *"
            value={formData.phone}
            onChange={set("phone")}
            required
            disabled={status === "loading"}
            className="h-12 rounded-xl bg-background border-border"
          />
          <Input
            placeholder="City"
            value={formData.city}
            onChange={set("city")}
            disabled={status === "loading"}
            className="h-12 rounded-xl bg-background border-border"
          />
        </div>
        <select
          value={formData.projectType}
          onChange={set("projectType")}
          disabled={status === "loading"}
          className="w-full h-12 rounded-xl bg-background border border-border px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Project Type (optional)</option>
          <option value="Residential">Residential Construction</option>
          <option value="Commercial">Commercial Project</option>
          <option value="Interior">Interior Design</option>
          <option value="Grey Structure">Grey Structure</option>
          <option value="Turnkey">Turnkey Solution</option>
          <option value="Other">Other</option>
        </select>
        <Textarea
          placeholder="Tell us about your project..."
          rows={5}
          value={formData.message}
          onChange={set("message")}
          disabled={status === "loading"}
          className="rounded-xl bg-background border-border resize-none"
        />
        <Button
          type="submit"
          variant="hero"
          size="xl"
          className="w-full"
          disabled={status === "loading"}
        >
          {status === "loading" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send Message
              <ArrowUpRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}

