import { useState, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";

export function useNavigation() {
  const [activeSection, setActiveSection] = useState("home");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const homeSections = useMemo(() => ["home", "about", "gallery", "blog"], []);

  const allPageSections = useMemo(() => {
    return {
      "/": [
        { name: "Home", section: "home" },
        { name: "About", section: "about" },
        { name: "Gallery", section: "gallery" },
        { name: "Blog", section: "blog" },
        { name: "Projects", section: "projects" },
        { name: "Achievements", section: "achievements" },
        { name: "Members", section: "members" },
        { name: "Others", section: "others" },
        { name: "Contact", section: "contact" },
      ],

      "/games": [],
      "/links": [],
      "/community": [],
      "/toolkit": [],
    };
  }, []);

  const currentPageSections = useMemo(() => {
    return allPageSections[pathname] || [];
  }, [pathname, allPageSections]);

  const MAX_VISIBLE_LINKS = 4;

  const visibleSections = useMemo(() => {
    if (currentPageSections.length <= MAX_VISIBLE_LINKS) {
      return { mainSections: currentPageSections, dropdownSections: [] };
    } else {
      return {
        mainSections: currentPageSections.slice(0, MAX_VISIBLE_LINKS),
        dropdownSections: currentPageSections.slice(MAX_VISIBLE_LINKS),
      };
    }
  }, [currentPageSections]);

  const isHomePage = pathname === "/";

  useEffect(() => {
    if (!isHomePage && pathname !== "/projects") return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      const sectionIds = currentPageSections.map((item) => item.section);

      const sections = sectionIds
        .map((id) => document.getElementById(id))
        .filter(Boolean);

      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage, pathname, currentPageSections]);

  const toggleDropdown = (value) => {
    if (value !== undefined) {
      setIsDropdownOpen(value);
    } else {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth",
      });
      setActiveSection(sectionId);
    }
  };

  return {
    activeSection,
    isDropdownOpen,
    isScrolled,
    isHomePage,
    homeSections,
    visibleSections,
    currentPageSections,
    pathname,
    toggleDropdown,
    scrollToSection,
  };
}
