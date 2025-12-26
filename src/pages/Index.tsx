import { MainLayout } from "@/components/layout";
import {
  HeroSection,
  ServicesSection,
  FeaturedProjects,
  TestimonialsSection,
  CTASection,
} from "@/components/home";

const Index = () => {
  return (
    <MainLayout>
      <HeroSection />
      <ServicesSection />
      <FeaturedProjects />
      <TestimonialsSection />
      <CTASection />
    </MainLayout>
  );
};

export default Index;
