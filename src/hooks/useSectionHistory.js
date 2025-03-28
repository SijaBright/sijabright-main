"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function useSectionHistory() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleNavigateAway = () => {
      if (pathname === "/") {
        const currentSection = getCurrentSection();
        if (currentSection) {
          sessionStorage.setItem("lastVisitedSection", currentSection);

          const state = { sectionId: currentSection };
          window.history.replaceState(state, "", window.location.pathname);
        }
      }
    };

    const getCurrentSection = () => {
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
            return sectionId;
          }
        }
      }

      return null;
    };

    const handlePopState = (event) => {
      if (pathname === "/") {
        const historySection = event.state?.sectionId;

        const lastSection =
          historySection || sessionStorage.getItem("lastVisitedSection");

        if (lastSection && lastSection !== "home") {
          setTimeout(() => {
            const section = document.getElementById(lastSection);
            if (section) {
              window.scrollTo({
                top: section.offsetTop - 80,
                behavior: "smooth",
              });
            }
          }, 100);
        }
      }
    };

    const handleLinkClick = () => {
      if (pathname === "/") {
        handleNavigateAway();
      }
    };

    if (pathname === "/") {
      const lastSection = sessionStorage.getItem("lastVisitedSection");
      if (lastSection && lastSection !== "home") {
        setTimeout(() => {
          const section = document.getElementById(lastSection);
          if (section) {
            window.scrollTo({
              top: section.offsetTop - 80,
              behavior: "smooth",
            });
          }
        }, 300);
      }
    }

    window.addEventListener("popstate", handlePopState);

    const links = document.querySelectorAll("a[href]");
    links.forEach((link) => {
      if (!link.getAttribute("href").startsWith("http")) {
        link.addEventListener("click", handleLinkClick);
      }
    });

    return () => {
      window.removeEventListener("popstate", handlePopState);

      links.forEach((link) => {
        if (!link.getAttribute("href").startsWith("http")) {
          link.removeEventListener("click", handleLinkClick);
        }
      });
    };
  }, [pathname]);
}
