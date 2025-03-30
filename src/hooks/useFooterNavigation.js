import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export function useFooterNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

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
