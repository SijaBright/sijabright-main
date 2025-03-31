"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "Network Analysis Tool",
      image: "/assets/projects/project1.jpg",
      size: "col-span-1 row-span-1",
    },
    {
      id: 2,
      title: "IoT Dashboard",
      image: "/assets/projects/project2.jpg",
      size: "col-span-1 row-span-1",
    },
    {
      id: 3,
      title: "SIJA Attendance System",
      image: "/assets/projects/project3.jpg",
      size: "col-span-2 row-span-1",
    },
    {
      id: 4,
      title: "Learning Management System",
      image: "/assets/projects/project4.jpg",
      size: "col-span-1 row-span-1",
    },
    {
      id: 5,
      title: "Security Project",
      image: "/assets/projects/project5.jpg",
      size: "col-span-1 row-span-1",
    },
    {
      id: 6,
      title: "Smart Room",
      image: "/assets/projects/project6.jpg",
      size: "col-span-1 row-span-1",
    },
  ];

  return (
    <div className="w-[95%] max-w-7xl mx-auto px-4 md:px-8 font-poppins">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-white">
            <span className="text-[#00c7fe]">Projects</span> - What We Build
          </h2>
          <div className="h-0.5 w-16 bg-[#00c7fe] mx-auto"></div>
        </div>

        <div className="max-w-3xl mx-auto">
          <p className="text-lg font-poppins text-gray-300 leading-relaxed">
            &ldquo;Ide tanpa eksekusi hanyalah konsep. This is where our ideas
            come to life. Dari small projects sampai big innovations, semuanya
            ada di sini. Check out what we&apos;ve built!&rdquo;
          </p>
        </div>

        <div className="mt-10 bg-[#1a0c36] rounded-2xl overflow-hidden shadow-lg w-full max-w-4xl mx-auto font-poppins">
          <div className="p-3 sm:p-4">
            <div className="grid grid-cols-3 gap-2 sm:gap-3 auto-rows-[70px] sm:auto-rows-[80px] md:auto-rows-[90px]">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className={`${project.size} relative overflow-hidden rounded-lg group transition-transform hover:scale-[1.02] cursor-pointer`}
                >
                  <div
                    className="h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${project.image})` }}
                  >
                    <div className="absolute inset-0 bg-[#00c7fe]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#1a0c36] py-3 px-4 sm:py-4 sm:px-6 flex justify-between items-center">
            <h4 className="text-white text-sm sm:text-base font-medium font-poppins">
              Our Projects
            </h4>
            <Link href="/projects" legacyBehavior>
              <a className="flex items-center gap-2 bg-[#554c74] hover:bg-[#675e85] text-white py-1.5 px-3 sm:py-2 sm:px-4 rounded-2xl border-2 border-[#d8d7d9] text-xs sm:text-sm transition-colors font-poppins">
                <span>View All</span>
                <ArrowRight size={14} className="hidden sm:inline" />
                <ArrowRight size={12} className="sm:hidden" />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
