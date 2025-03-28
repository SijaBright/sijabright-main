import Link from "next/link";
import Image from "next/image";
import { ArrowRightCircle } from "lucide-react";

export default function Others() {
  const links = [
    {
      title: "Public Games",
      description: "Explore fun games created by our team members",
      image: "/assets/images/games-preview.webp",
      href: "/games",
    },
    {
      title: "Useful Links",
      description: "Collection of helpful resources for students",
      image: "/assets/images/links-preview.webp",
      href: "/links",
    },
    {
      title: "Community",
      description: "Join our community forums and discussion boards",
      image: "/assets/images/community-preview.webp",
      href: "/community",
    },
    {
      title: "Toolkit",
      description: "Essential tools and resources for development",
      image: "/assets/images/toolkit-preview.webp",
      href: "/toolkit",
    },
  ];

  return (
    <div className="w-[95%] max-w-7xl mx-auto px-4 md:px-8">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-white">
            <span className="text-[#00c7fe]">Others</span> From Us
          </h2>
          <div className="h-0.5 w-16 bg-[#00c7fe] mx-auto"></div>
        </div>

        <div className="max-w-3xl mx-auto">
          <p className="text-lg font-poppins text-gray-300 leading-relaxed">
            Koding dan networking emang seru, tapi ada yang lebih dari itu! Di
            sini, kamu bisa main game, akses tools penting, atau gabung
            komunitas buat diskusi seru. Everything in one place, tinggal pilih
            dan ekspor lebih jauh!
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {links.map((link, index) => (
            <Link key={index} href={link.href}>
              <div className="bg-[#0e0a2b] rounded-xl overflow-hidden h-full group transition-all duration-300 hover:border-3 hover:border-[#ffffff] transform hover:-translate-y-1">
                <div className="relative h-48">
                  <Image
                    src={link.image}
                    alt={link.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white font-poppins">
                      {link.title}
                    </h3>
                    <div className="bg-[#00c7fe]/10 p-2 rounded-full hover:bg-[#00c7fe]/30 transition-colors duration-300">
                      <ArrowRightCircle className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
