"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Instagram,
  Twitter,
  Youtube,
  Github,
  Linkedin,
  Send,
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribeStatus("success");
        setTimeout(() => {
      setEmail("");
      setSubscribeStatus("");
    }, 3000);
  };

  return (
    <footer className="w-full bg-[#020106] font-poppins">
      <div className="w-[95%] max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                    <div className="space-y-4 sm:space-y-6">
            <Link href="/" className="inline-block">
              <div className="flex items-center gap-3">
                <Image
                  src="/assets/images/sijabright-white.webp"
                  alt="SIJA BRIGHT Logo"
                  width={70}
                  height={70}
                  className="object-contain"
                />
                <span className="text-white font-semibold text-lg sm:text-xl">
                  SIJA BRIGHT
                </span>
              </div>
            </Link>
            <div>
              <p className="text-[#ffffff] text-sm leading-relaxed">
                Angkatan 27 - STEMBAYO
              </p>
              <p className="text-[#ffffff] text-sm leading-relaxed">
                Website resmi kelas SIJA B,
              </p>
              <p className="text-[#ffffff] text-sm leading-relaxed">
                tempat berbagu ilmu, proyek, dan kenangan bersama. Dibuat dengan
                semangat kebersamaan dan inovasi!
              </p>
            </div>
          </div>
          <div className="mt-8 sm:mt-16 md:mt-24">
            <ul className="space-y-2">
              {[
                { label: "Tentang Kami", href: "about" },
                { label: "Proyek Kelas", href: "projects" },
                { label: "Galeri Kenangan", href: "gallery" },
                { label: "Blog & Tutorial", href: "blog" },
                { label: "Community & Forum", href: "community" },
                { label: "Toolkit & Resources", href: "resources" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={`/#${href}`}
                    className="text-[#ffffff] hover:text-[#00c7fe] transition-colors duration-200 text-sm flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

                    <div className="mt-8 sm:mt-16 md:mt-24">
            <ul className="space-y-4">
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-[#ffffff] mr-3 flex-shrink-0" />
                <span className="text-[#ffffff] text-sm">
                  +62 123-4567-8910
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-[#ffffff] mr-3 flex-shrink-0" />
                <span className="text-[#ffffff] text-sm">
                  contact@sijabright.com
                </span>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-[#ffffff] mt-1 mr-3 flex-shrink-0" />
                <span className="text-[#ffffff] text-sm">
                  SMKN 1 Jakarta, Jalan Budi Utomo No. 7, Jakarta Pusat
                </span>
              </li>
            </ul>
          </div>
          <div className="mt-8 sm:mt-12">
            <h3 className="text-white font-bold text-lg mb-4 sm:mb-6">
              SUBSCRIBE
            </h3>

            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="w-full bg-[#14111f] border border-[#ffffff] rounded-lg py-2 pl-4 pr-12 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#00c7fe] focus:border-[#00c7fe]"
                />
                <button
                  type="submit"
                  className="w-4 h-4 border absolute right-1 top-1/2 -translate-y-1/2 bg-[#00c7fe] hover:bg-[#00a7dc] rounded-md p-0.5 sm:p-1.5 text-white transition-colors duration-200 items-center justify-center flex align-center"
                  aria-label="Subscribe"
                >
                  <Send className="w-3 h-3 sm:w-4 sm:h-4 -rotate-315 text-center" />
                </button>
              </div>

              {subscribeStatus === "success" && (
                <p className="text-green-400 text-xs">
                  Thank you for subscribing!
                </p>
              )}
            </form>

                        <div className="mt-6">
              <p className="text-[#ffffff] font-bold text-sm mb-3">FOLLOW US</p>
              <div className="flex space-x-4">
                {[
                  { icon: Instagram, href: "#", label: "Instagram" },
                  { icon: Github, href: "#", label: "GitHub" },
                  { icon: Twitter, href: "#", label: "Twitter" },
                  { icon: Youtube, href: "#", label: "YouTube" },
                  { icon: Linkedin, href: "#", label: "LinkedIn" },
                ].map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="bg-[#14111f] hover:bg-[#241e5d] p-2 rounded-full transition-colors duration-200"
                  >
                    <social.icon className="w-4 h-4 text-[#ffffff]" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

            <div className="w-full bg-[#05c5fa] py-4 text-center">
        <div className="w-[95%] flex flex-col sm:flex-row sm:items-center sm:justify-between max-w-7xl mx-auto px-4 md:px-8 gap-3 sm:gap-0">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} All rights reserved. | by SIJA BRIGHT
          </p>
          <div className="flex flex-row gap-4 justify-center sm:justify-end">
            <Link href="/terms" className="text-gray-500 text-sm">
              Terms
            </Link>
            <Link href="/privacy" className="text-gray-500 text-sm">
              Privacy
            </Link>
            <Link
              href="/complience"
              className="text-gray-500 text-sm mr-0 sm:mr-4"
            >
              Complience
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
