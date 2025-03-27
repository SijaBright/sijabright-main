import Nav from "@/components/shared/Nav";
import Hero from "@/components/home/Hero";
import About from "@/components/home/Description";
import Gallery from "@/components/home/Gallery";
import Blog from "@/components/home/Blog";
import Projects from "@/components/home/Projects";
import AllMember from "@/components/home/AllMember";
import Achievements from "@/components/home/Achievments";
import MailForm from "@/components/home/MailForm";
import Footer from "@/components/shared/Footer";

export async function generateMetadata() {
  return {
    title: "HOME | SIJABRIGHT",
    description:
      "Website resmi SIJA BRIGHT - Kelas SIJA B Angkatan 27 STEMBAYO",
    openGraph: {
      images: [
        {
          url: "/assets/images/hero-og.jpg",
          width: 1200,
          height: 630,
          alt: "SIJA BRIGHT Home",
        },
      ],
    },
  };
}

export default function Home() {
  return (
    <main className="relative">
      <Nav />

      <section
        id="home"
        className="min-h-[90vh] md:min-h-screen flex items-center pt-20 mt-4 md:mt-0 md:pt-0"
      >
        <div className="w-full">
          <Hero />
        </div>
      </section>

      <section
        id="about"
        className="py-16 md:py-24 md:min-h-screen flex items-center"
      >
        <About />
      </section>

      <section id="gallery" className="min-h-screen flex items-center">
        <Gallery />
      </section>

      <section id="blog" className="min-h-screen flex items-center">
        <Blog />
      </section>

      <section id="projects" className="min-h-screen flex items-center">
        <Projects />
      </section>

      <section id="achievements" className="min-h-screen flex items-center">
        <Achievements />
      </section>

      <section id="members" className="min-h-screen flex items-center">
        <AllMember />
      </section>

      <section id="contact" className="min-h-screen flex items-center">
        <MailForm />
      </section>

      <section id="footer" className="flex items-center">
        <Footer />
      </section>
    </main>
  );
}
