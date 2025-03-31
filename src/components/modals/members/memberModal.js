"use client";

import { motion, AnimatePresence } from "framer-motion";
import { XCircle, Globe, Calendar, Quote, Instagram } from "lucide-react";
import { useEffect } from "react";

export default function MemberModal({ member, isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.setProperty(
        "--scrollbar-width",
        `${scrollbarWidth}px`
      );

      const scrollY = window.scrollY;

      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  if (!isOpen || !member) return null;

  const getRoleColorClasses = (role) => {
    switch (role) {
      case "Designer":
        return {
          gradient: "from-purple-500 via-pink-500 to-rose-500",
          text: "text-pink-400",
          border: "border-pink-400",
        };
      case "Programmer":
        return {
          gradient: "from-blue-500 via-cyan-500 to-teal-500",
          text: "text-cyan-400",
          border: "border-cyan-400",
        };
      case "DevOps":
        return {
          gradient: "from-amber-500 via-orange-500 to-red-500",
          text: "text-orange-400",
          border: "border-orange-400",
        };
      default:
        return {
          gradient: "from-[#00c7fe] via-[#6699ff] to-[#337dea]",
          text: "text-[#00c7fe]",
          border: "border-[#00c7fe]",
        };
    }
  };

  const roleColors = member.role
    ? getRoleColorClasses(member.role)
    : getRoleColorClasses();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center overflow-y-auto py-6 sm:py-8 md:py-12 px-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-b from-[#1a1a2e] to-[#0c0e21] rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl relative my-auto border-2 border-[#0c0e21]"
              style={{ maxHeight: "calc(100vh - 3rem)" }}
            >
              {member.role && (
                <div
                  className={`h-2 w-full bg-gradient-to-r ${roleColors.gradient}`}
                ></div>
              )}

              <button
                onClick={onClose}
                className="absolute right-4 top-4 text-white/70 hover:text-white z-20 cursor-pointer"
                aria-label="Close modal"
              >
                <XCircle size={28} />
              </button>

              <div className="flex flex-col md:flex-row max-h-[calc(100vh-6rem)] overflow-y-auto">
                <div className="md:w-2/5 w-full relative bg-gradient-to-br from-black/30 to-black/10 p-4 sm:p-6">
                  <div className="aspect-[3/4] overflow-hidden rounded-xl relative group max-w-[250px] mx-auto">
                    <div
                      className="w-full h-full bg-cover bg-center rounded-xl shadow-lg"
                      style={{ backgroundImage: `url(${member.image})` }}
                    ></div>

                    <div className="absolute top-4 left-4 bg-[#00c7fe]/90 text-black font-bold rounded-full w-9 h-9 flex items-center justify-center text-sm shadow-[0_0_10px_rgba(0,199,254,0.5)] font-poppins">
                      {member.number}
                    </div>

                    {member.role && (
                      <div
                        className={`absolute bottom-4 left-4 ${roleColors.text} bg-black/70 backdrop-blur-sm py-1 px-3 rounded-full text-sm font-medium border border-opacity-30 ${roleColors.border} font-poppins`}
                      >
                        {member.role}
                      </div>
                    )}
                  </div>
                </div>

                <div className="md:w-3/5 p-4 sm:p-6 overflow-y-auto">
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <h2 className="text-3xl font-bold text-white font-poppins">
                        {member.name}
                      </h2>
                      <p
                        className={`${roleColors.text} font-medium mt-1 font-poppins`}
                      >
                        {member.position}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Calendar className="text-white/70 h-5 w-5 mt-1" />
                        <div>
                          <p className="text-white/50 text-sm font-poppins">
                            Tanggal Lahir
                          </p>
                          <p className="text-white font-poppins">
                            {member.birthDay}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Quote className="text-white/70 h-5 w-5 mt-1" />
                        <div>
                          <p className="text-white/50 text-sm font-poppins">
                            Quote
                          </p>
                          <p className="text-white italic font-poppins">
                            &ldquo;{member.quotes}&rdquo;
                          </p>
                        </div>
                      </div>

                      {member.instagram && (
                        <div className="flex items-start space-x-3">
                          <Instagram className="text-white/70 h-5 w-5 mt-1" />
                          <div>
                            <p className="text-white/50 text-sm font-poppins">
                              Instagram
                            </p>
                            <a
                              href={`https://instagram.com/${member.instagram.replace(
                                "@",
                                ""
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`${roleColors.text} hover:underline flex items-center gap-1 font-poppins`}
                            >
                              {member.instagram}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3 opacity-70"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                              </svg>
                            </a>
                          </div>
                        </div>
                      )}

                      {member.website && (
                        <div className="flex items-start space-x-3">
                          <Globe className="text-white/70 h-5 w-5 mt-1" />
                          <div>
                            <p className="text-white/50 text-sm font-poppins">
                              Website
                            </p>
                            <a
                              href={
                                member.website.startsWith("http")
                                  ? member.website
                                  : `https://${member.website}`
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`${roleColors.text} hover:underline flex items-center gap-1 font-poppins`}
                            >
                              {member.website.replace(/(^\w+:|^)\/\//, "")}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3 opacity-70"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                              </svg>
                            </a>
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1 font-poppins">
                        About
                      </h3>
                      <p className="text-white/80 leading-relaxed font-poppins">
                        {member.description}
                      </p>
                    </div>

                    {member.skills && member.skills.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2 font-poppins">
                          Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {member.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="bg-black/30 text-white/80 px-3 py-1 rounded-full text-sm border border-white/10 font-poppins"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
