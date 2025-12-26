import { MainLayout } from "@/components/layout";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { id: 1, name: "Ahmed Hassan", company: "Hassan Developers", text: "Real Enterprises transformed our vision into reality. Their attention to detail is unmatched.", rating: 5 },
  { id: 2, name: "Fatima Khan", company: "Private Residence", text: "Building our dream home was a seamless experience. Highly recommended!", rating: 5 },
  { id: 3, name: "Muhammad Ali", company: "Ali & Sons Trading", text: "Professional, reliable, and efficient. Delivered our office building on time and within budget.", rating: 5 },
  { id: 4, name: "Sara Malik", company: "Interior Boutique", text: "The interior design team has incredible taste. Our customers love the new space!", rating: 5 },
];

const Testimonials = () => {
  return (
    <MainLayout>
      <section className="pt-32 pb-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
            Client <span className="text-accent">Testimonials</span>
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">What our clients say about working with us.</p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((t) => (
              <div key={t.id} className="p-8 bg-card rounded-lg border border-border">
                <Quote className="w-10 h-10 text-accent/30 mb-4" />
                <div className="flex gap-1 mb-4">{Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="w-4 h-4 fill-accent text-accent" />)}</div>
                <p className="text-foreground mb-6">"{t.text}"</p>
                <div><div className="font-semibold text-foreground">{t.name}</div><div className="text-muted-foreground text-sm">{t.company}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Testimonials;
