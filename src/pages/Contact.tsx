import { useState } from "react";
import { MainLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", city: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you! We'll contact you soon.");
    setFormData({ name: "", email: "", phone: "", city: "", message: "" });
  };

  return (
    <MainLayout>
      <section className="pt-32 pb-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
            Contact <span className="text-accent">Us</span>
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">Get in touch for a free consultation.</p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                <Input type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                <Input placeholder="Phone Number" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
                <Input placeholder="City" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} required />
                <Textarea placeholder="Your Message" rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required />
                <Button type="submit" variant="hero" size="lg" className="w-full">Send Message</Button>
              </form>
            </div>
            <div className="space-y-8">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">Contact Information</h2>
              <div className="space-y-6">
                <a href="tel:+923001234567" className="flex items-start gap-4 text-muted-foreground hover:text-accent transition-colors">
                  <Phone className="w-6 h-6 text-accent mt-1" /><div><div className="font-medium text-foreground">Phone</div>+92 300 123 4567</div>
                </a>
                <a href="mailto:info@realenterprises.pk" className="flex items-start gap-4 text-muted-foreground hover:text-accent transition-colors">
                  <Mail className="w-6 h-6 text-accent mt-1" /><div><div className="font-medium text-foreground">Email</div>info@realenterprises.pk</div>
                </a>
                <div className="flex items-start gap-4 text-muted-foreground">
                  <MapPin className="w-6 h-6 text-accent mt-1" /><div><div className="font-medium text-foreground">Office</div>Office 12, Blue Area, Islamabad</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Contact;
