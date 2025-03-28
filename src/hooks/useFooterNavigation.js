import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export function useFooterNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  /**
   * Navigate to a section on the page or redirect to homepage with smooth scroll
   * @param {string} sectionId - The ID of the section to scroll to
   */
  const navigateToSection = useCallback(
    (sectionId) => {
      if (isHomePage) {
        scrollToSection(sectionId);
      } else {
        window.location.href = `/#${sectionId}`;
      }
    },
    [isHomePage]
  );

  /**
   * Scroll to a section by ID with smooth animation
   * @param {string} sectionId - The ID of the section to scroll to
   */
  const scrollToSection = useCallback((sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth",
      });
    }
  }, []);

  return {
    navigateToSection,
    isHomePage,
  };
}
