import { MainLayout } from "@/components/layout";
import { Star } from "lucide-react";

const testimonials = [
  { id: 1, name: "Ahmed Hassan", company: "Hassan Developers", text: "Real Enterprises transformed our vision into reality. Their attention to detail and commitment to quality is unmatched. The commercial plaza they built exceeded all expectations.", rating: 5 },
  { id: 2, name: "Fatima Khan", company: "Private Residence", text: "Building our dream home was a seamless experience with Real Enterprises. From the initial design to the final handover, they kept us informed every step. Highly recommended!", rating: 5 },
  { id: 3, name: "Muhammad Ali", company: "Ali & Sons Trading", text: "Professional, reliable, and efficient. Real Enterprises delivered our office building on time and within budget. The quality of construction is exceptional.", rating: 5 },
  { id: 4, name: "Sara Malik", company: "Interior Boutique", text: "The interior design team at Real Enterprises has incredible taste. They completely redesigned our showroom and the results are stunning. Our customers love the new space!", rating: 5 },
  { id: 5, name: "Imran Sheikh", company: "Sheikh Properties", text: "We've worked with Real Enterprises on multiple projects. Their consistency and professionalism make them our go-to construction partner.", rating: 5 },
  { id: 6, name: "Ayesha Rani", company: "Private Villa", text: "From start to finish, the team was professional and dedicated. Our villa turned out exactly as we imagined. Thank you Real Enterprises!", rating: 5 },
];

const Testimonials = () => {
  return (
    <MainLayout>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3 block animate-fade-up">
              Testimonials
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-up animation-delay-100">
              What Our Clients
              <br />
              <span className="text-muted-foreground">Say About Us</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="pb-12 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-3 gap-4 max-w-xl">
            {[
              { value: "98%", label: "Satisfaction Rate" },
              { value: "4.9", label: "Average Rating" },
              { value: "200+", label: "Happy Clients" },
            ].map((stat) => (
              <div key={stat.label} className="bg-card rounded-xl p-5 text-center border border-border">
                <div className="font-display text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-background rounded-2xl p-6 border border-border">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground mb-6 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold text-sm">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Testimonials;
