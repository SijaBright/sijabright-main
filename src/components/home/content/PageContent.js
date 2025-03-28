"use client";

import { useEffect, useRef } from "react";
import Nav from "@/components/shared/Nav";
import Hero from "@/components/home/Hero";
import About from "@/components/home/Description";
import Gallery from "@/components/home/Gallery";
import Blog from "@/components/home/Blog";
import Projects from "@/components/home/Projects";
import AllMember from "@/components/home/AllMember";
import Achievements from "@/components/home/Achievments";
import Others from "@/components/home/Others";
import MailForm from "@/components/home/MailForm";
import Footer from "@/components/shared/Footer";
import { useSectionHistory } from "@/hooks/useSectionHistory";

export default function PageContent() {
  useSectionHistory();

  const initialLoadCompleted = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const intervalId = setInterval(() => {
      const sections = [
        "home",
        "about",
        "gallery",
        "blog",
        "projects",
        "achievements",
        "members",
        "others",
        "contact",
      ];

      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const { top, bottom } = section.getBoundingClientRect();
          const sectionTop = top + window.scrollY;
          const sectionBottom = bottom + window.scrollY;

          if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
            const state = { sectionId };
            window.history.replaceState(state, "", window.location.pathname);

            if (initialLoadCompleted.current) {
              sessionStorage.setItem("lastVisitedSection", sectionId);
            }
            break;
          }
        }
      }
    }, 500);

    const loadTimer = setTimeout(() => {
      initialLoadCompleted.current = true;
    }, 1000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(loadTimer);
    };
  }, []);

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

      <section id="others" className="min-h-screen flex items-center">
        <Others />
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
