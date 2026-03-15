"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUpRight } from "lucide-react";
import { toast } from "sonner";

export function ContactClient() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", city: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you! We'll contact you within 24 hours.");
    setFormData({ name: "", email: "", phone: "", city: "", message: "" });
  };

  return (
    <div className="bg-card rounded-2xl p-6 md:p-8 border border-border">
      <h2 className="font-display text-2xl font-bold text-foreground mb-6">Send a Message</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid md:grid-cols-2 gap-5">
          <Input
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="h-12 rounded-xl bg-background border-border"
          />
          <Input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="h-12 rounded-xl bg-background border-border"
          />
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          <Input
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
            className="h-12 rounded-xl bg-background border-border"
          />
          <Input
            placeholder="City"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            required
            className="h-12 rounded-xl bg-background border-border"
          />
        </div>
        <Textarea
          placeholder="Tell us about your project..."
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
          className="rounded-xl bg-background border-border resize-none"
        />
        <Button type="submit" variant="hero" size="xl" className="w-full">
          Send Message
          <ArrowUpRight className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}
