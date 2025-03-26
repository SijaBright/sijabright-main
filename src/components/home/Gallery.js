"use client";

import Image from "next/image";

const galleryImages = [
  {
    id: 1,
    src: "/images/classroom.jpg",
    alt: "Morning Study Session",
    className: "col-span-1 row-span-1",
  },
  {
    id: 2,
    src: "/images/team-meeting.jpg",
    alt: "First Team Meeting",
    className: "col-span-2 row-span-2",
  },
  {
    id: 3,
    src: "/images/ceremony.jpg",
    alt: "After Flag Raising Ceremony",
    className: "col-span-1 row-span-2",
  },
  {
    id: 4,
    src: "/images/group-photo.jpg",
    alt: "Team Building Activity",
    className: "col-span-1 row-span-1",
  },
  {
    id: 5,
    src: "/images/presentation.jpg",
    alt: "Student Leadership Workshop",
    className: "col-span-2 row-span-1",
  },
];

export default function Gallery() {
  return (
    <div className="w-full">
      <div className="w-[95%] max-w-7xl mx-auto px-4 md:px-8 mb-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-white">
            <span className="text-[#00c7fe]">Gallery</span> - Memories & Moments
          </h2>
          <div className="h-0.5 w-16 bg-[#00c7fe] mx-auto"></div>
          <p className="text-gray-300 font-poppins max-w-3xl mx-auto">
            &ldquo;Setiap momen punya cerita. From daily class activities to
            special events, semua kenangan ada di sini. Because every journey
            deserves to be remembered.&rdquo;
          </p>
        </div>
      </div>

      <div className="w-[90%] max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 auto-rows-[250px]">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className={`relative group overflow-hidden rounded-xl ${image.className}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white text-lg font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 text-center px-4">
                  {image.alt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
