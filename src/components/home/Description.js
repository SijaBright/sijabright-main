"use client";

import Image from "next/image";

export default function About() {
  return (
    <div className="w-[95%] max-w-7xl mx-auto px-4 md:px-8">
      <div className="w-full bg-[#0f1126] rounded-3xl shadow-lg">
        <div className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/3 relative">
              <div className="relative w-[250px] h-[250px] mx-auto">
                <Image
                  src="/assets/images/sijabright-white.webp"
                  alt="SIJA BRIGHT Logo"
                  width={200}
                  height={200}
                  className="object-contain w-full h-full"
                  priority
                />
              </div>
            </div>

            <div className="md:w-2/3 space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl md:text-4xl font-poppins font-bold text-white">
                  About <span className="text-[#00c7fe]">Us</span>
                </h2>
                <div className="h-0.5 w-16 bg-[#00c7fe]"></div>
              </div>

              <div className="space-y-4">
                <p className="text-base md:text-lg font-poppins text-gray-300 leading-relaxed">
                  &ldquo;Kami belajar, mengeksplorasi, dan menciptakan tanpa
                  batas. Every line of code, every network built-semua adalah
                  bagian dari perjalanan kami. This website is where ideas turn
                  into reality, tempat untuk berbagi ilmu, karya, dan inovasi.
                  Because in tech, growth and evolution never stop.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
