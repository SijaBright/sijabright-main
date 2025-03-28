"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useNavigation } from "@/hooks/useNavigation";
import { ChevronDown, Menu, X } from "lucide-react";

export default function Nav() {
  const {
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
  } = useNavigation();

  const { mainSections, dropdownSections } = visibleSections;
  const hasDropdown = dropdownSections.length > 0;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      
      if (
        isMobileMenuOpen &&
        !event.target.closest(".mobile-menu-container") &&
        !event.target.closest('[aria-label="Toggle mobile menu"]')
      ) {
        setIsMobileMenuOpen(false);
      }

      
      if (
        isDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        toggleDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen, isDropdownOpen, toggleDropdown]);

  const handleMobileNavigation = (sectionId) => {
    scrollToSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  const handleDropdownNavigation = (sectionId) => {
    scrollToSection(sectionId);
    toggleDropdown(false);
  };

  return (
    <nav
      className={`fixed top-4 md:top-8 left-1/2 transform -translate-x-1/2 z-50 backdrop-blur-lg rounded-2xl md:rounded-3xl px-4 md:px-6 py-2 md:py-3 border border-[#86868e] bg-black/30 transition-all duration-300 ${
        isScrolled ? "shadow-lg" : ""
      } w-[95%] max-w-7xl mx-auto`}
    >
      <div className="flex items-center justify-between">
        
        <div className="flex items-center">
          <Link href={`/`} className="flex items-center">
            <Image
              src="/assets/images/sijabright-white.webp"
              alt="SIJA BRIGHT logo"
              width={40}
              height={40}
              className="mr-3"
              priority
            />
          </Link>
        </div>

        
        <div className="hidden md:flex items-center gap-6 ml-8">
          
          {mainSections.map((section) => (
            <button
              key={section.section}
              onClick={() => scrollToSection(section.section)}
              className={`font-poppins text-sm cursor-pointer relative pb-2 ${
                activeSection === section.section
                  ? "text-[#00c7fe] font-medium"
                  : "text-white hover:text-[#00c7fe] transition-colors"
              } group`}
            >
              <span>{section.name}</span>
              <span
                className={`absolute bottom-0 left-0 h-[1px] bg-[#00c7fe] transition-all duration-300 ${
                  activeSection === section.section
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              ></span>
            </button>
          ))}

          
                {hasDropdown && (
                <div className="relative" ref={dropdownRef}>
                  <button
                  onClick={() => toggleDropdown()}
                  className="font-poppins text-sm text-white hover:text-[#00c7fe] flex items-center gap-1 cursor-pointer relative pb-2 group"
                  >
                  All
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={`w-5 h-5 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                    }`}
                  >
                    <path d="M12 16l-6-6h12l-6 6z" />
                  </svg>
                  <span className="mt-[-6px] absolute bottom-0 left-0 w-0 h-[1px] bg-[#00c7fe] group-hover:w-full transition-all duration-300"></span>
                  </button>

                  {isDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 bg-black/80 backdrop-blur-lg rounded-lg py-2 px-1 min-w-[140px] border border-gray-800">
                    {dropdownSections.map((item) => (
                    <button
                      key={item.section}
                      onClick={() => handleDropdownNavigation(item.section)}
                      className={`block w-full text-left px-4 py-2 text-sm font-poppins rounded hover:bg-gray-800 cursor-pointer ${
                      activeSection === item.section
                        ? "text-[#00c7fe] font-medium"
                        : "text-white hover:text-[#00c7fe]"
                      } transition-colors`}
                    >
                      {item.name}
                    </button>
                    ))}
                  </div>
                  )}
                </div>
                )}
              </div>

              
        <button
          className="md:hidden text-white hover:text-[#00c7fe] transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      
      {isMobileMenuOpen && (
        <div className="md:hidden mobile-menu-container">
          <div className="mt-4 pt-4 border-t border-gray-700">
            
            {currentPageSections.map((section) => (
              <button
                key={section.section}
                onClick={() => handleMobileNavigation(section.section)}
                className={`block w-full text-left py-3 px-2 font-poppins text-sm ${
                  activeSection === section.section
                    ? "text-[#00c7fe] font-medium bg-white/5 rounded-lg"
                    : "text-white"
                }`}
              >
                {section.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
