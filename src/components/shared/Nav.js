"use client";

import { useState, useEffect } from "react";
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
    otherPages,
    pathname,
    toggleDropdown,
    scrollToSection,
  } = useNavigation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

    const handleMobileNavigation = (sectionId) => {
    scrollToSection(sectionId);
    setIsMobileMenuOpen(false);
  }

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
            <span className="text-white font-medium text-lg hidden sm:block">SIJA BRIGHT</span>
          </Link>
        </div>

        
        <div className="hidden md:flex items-center gap-6 ml-8">
          {isHomePage &&
            homeSections.map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`font-poppins text-sm cursor-pointer relative pb-2 ${
                  activeSection === section
                    ? "text-[#00c7fe] font-medium"
                    : "text-white hover:text-[#00c7fe] transition-colors"
                } group`}
              >
                <span>
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </span>
                <span 
                  className={`absolute bottom-0 left-0 h-[1px] bg-[#00c7fe] transition-all duration-300 ${
                    activeSection === section 
                      ? "w-full" 
                      : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </button>
            ))}

          
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="font-poppins text-sm text-white hover:text-[#00c7fe] flex items-center gap-1 cursor-pointer relative pb-2 group"
            >
              All
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#00c7fe] group-hover:w-full transition-all duration-300"></span>
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 bg-black/80 backdrop-blur-lg rounded-lg py-2 px-1 min-w-[140px] border border-gray-800">
                {otherPages.map((page) => (
                  <Link
                    key={page.name}
                    href={page.href}
                    className={`block px-4 py-2 text-sm font-poppins rounded hover:bg-gray-800 cursor-pointer ${
                      pathname === page.href
                        ? "text-[#00c7fe] font-medium"
                        : "text-white hover:text-[#00c7fe]"
                    } transition-colors`}
                    onClick={() => toggleDropdown(false)}
                  >
                    {page.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
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
            {isHomePage && homeSections.map((section) => (
              <button
                key={section}
                onClick={() => handleMobileNavigation(section)}
                className={`block w-full text-left py-3 px-2 font-poppins text-sm ${
                  activeSection === section
                    ? "text-[#00c7fe] font-medium bg-white/5 rounded-lg"
                    : "text-white"
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
            
            
            <div className="mt-2 pt-4 border-t border-gray-700/50">
              <p className="px-2 mb-2 text-xs text-gray-400">More Pages</p>
              {otherPages.map((page) => (
                <Link
                  key={page.name}
                  href={page.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block w-full text-left py-3 px-2 font-poppins text-sm ${
                    pathname === page.href
                      ? "text-[#00c7fe] font-medium bg-white/5 rounded-lg"
                      : "text-white"
                  }`}
                >
                  {page.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}