import Nav from "@/components/shared/Nav";
import Footer from "@/components/shared/Footer";
import BackToHomeButton from "@/components/shared/BackToHomeButton";
import { ScrollText } from "lucide-react";

export const metadata = {
  title: "BLOG | SIJABRIGHT",
  description: "Read articles and stories from SIJA BRIGHT team",
};

export default function BlogPage() {
  return (
    <main className="relative bg-[#0a0a0f] min-h-screen">
      <Nav />

      <div className="pt-32 pb-20 px-4">
        <div className="w-[95%] max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-[#00c7fe]/20 p-5 rounded-full">
              <ScrollText className="w-16 h-16 md:w-20 md:h-20 text-[#00c7fe]" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-bold text-white mb-6">
            COMING <span className="text-[#00c7fe]">SOON</span>
          </h1>

          <div className="h-0.5 w-24 bg-[#00c7fe] mx-auto mb-10"></div>

          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            We&apos;re preparing interesting articles, tutorials, and stories about our journey in SIJA.
            Stay tuned for updates!
          </p>

          <div className="mb-14">
            <BackToHomeButton />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}