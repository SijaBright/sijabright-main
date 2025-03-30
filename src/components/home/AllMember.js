"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { memberData } from "@/data/memberData";
import MemberModal from "@/components/modals/members/memberModal";

export default function AllMember() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const [direction, setDirection] = useState(0);
  const carouselRef = useRef(null);
  const itemsPerView = 7;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const members = memberData;

  const openMemberModal = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const closeMemberModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(
        carouselRef.current.scrollWidth - carouselRef.current.offsetWidth
      );
    }

    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + members.length) % members.length);
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % members.length);
  };

  const getDisplayedItems = () => {
    const items = [];
    const itemsToShow = getIsMobile() ? 1 : itemsPerView;
    const halfItems = Math.floor(itemsToShow / 2);

    for (let i = -halfItems; i <= halfItems; i++) {
      if (getIsMobile() && i !== 0) continue;

      const index = (activeIndex + i + members.length) % members.length;
      items.push({
        ...members[index],
        offset: i,
        isActive: i === 0,
      });
    }

    return items;
  };

  const handleSelectMember = (index) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const touchStartX = useRef(0);
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX.current - touchEndX;

    if (diffX > 50) {
      handleNext();
    } else if (diffX < -50) {
      handlePrev();
    }
  };

  const getIsMobile = () => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 640;
  };

  const getVisibleRange = () => {
    const isMobile = getIsMobile();
    const visibleCount = isMobile ? 5 : window.innerWidth < 768 ? 9 : 15;
    const halfVisible = Math.floor(visibleCount / 2);

    let start = activeIndex - halfVisible;
    let end = activeIndex + halfVisible;

    if (start < 0) {
      end -= start;
      start = 0;
    }

    if (end >= members.length) {
      start = Math.max(0, start - (end - members.length + 1));
      end = members.length - 1;
    }

    return { start, end };
  };

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { start, end } = getVisibleRange();

  return (
    <div className="relative">
      <div
        className="absolute w-screen h-[40%] sm:h-[40%] md:h-[35%] bg-[#131228] left-1/2 -translate-x-1/2 bottom-0"
        style={{ maxWidth: "100vw" }}
      ></div>

      <div className="w-[95%] max-w-7xl mx-auto px-2 sm:px-4 md:px-8">
        <div className="text-center space-y-2 sm:space-y-3 md:space-y-4">
          <div className="space-y-2 sm:space-y-3 md:space-y-4">
            <h2 className="text-xl sm:text-2xl md:text-4xl font-poppins font-bold text-white">
              <span className="text-[#00c7fe]">Members</span> - Meet the Team
            </h2>
            <div className="h-0.5 w-10 sm:w-12 md:w-16 bg-[#00c7fe] mx-auto"></div>
          </div>

          <div className="max-w-3xl mx-auto px-2 sm:px-3">
            <p className="text-sm sm:text-base md:text-lg font-poppins text-gray-300 leading-relaxed">
              &ldquo;Kami bukan sekedar teman sekelas, we are a team. Setiap
              anggota punya peran, skill, dan kontribusi yang bikin SIJA
              B&apos;27 semakin solid. Get to know everyone here!&rdquo;
            </p>
          </div>

          <p className="text-xs sm:text-sm font-medium text-[#00c7fe]/80 tracking-wide max-w-xl mx-auto">
            <span className="animate-pulse inline-block mr-1">👆</span>
            Klik Kartu Untuk Lebih Lengkapnya
            <span className="animate-pulse inline-block ml-1">👆</span>
          </p>

          <div
            className="relative w-full py-1 sm:py-2 md:py-4 overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <motion.button
              onClick={handlePrev}
              className="absolute cursor-pointer left-2 sm:left-2 md:left-10 top-1/2 -translate-y-1/2 z-50 bg-black/70 hover:bg-black/90 backdrop-blur-sm rounded-full p-3 sm:p-2 md:p-3 text-white hover:text-[#00c7fe] transition-all transform hover:-translate-x-1 active:scale-95 focus:outline-none border-2 border-[#00c7fe]/30 hover:border-[#00c7fe]"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 1 }}
            >
              <ChevronLeft size={20} className="sm:hidden" />
              <ChevronLeft size={20} className="hidden sm:block md:hidden" />
              <ChevronLeft size={28} className="hidden md:block" />
            </motion.button>

            <motion.button
              onClick={handleNext}
              className="absolute cursor-pointer right-2 sm:right-2 md:right-10 top-1/2 -translate-y-1/2 z-50 bg-black/70 hover:bg-black/90 backdrop-blur-sm rounded-full p-3 sm:p-2 md:p-3 text-white hover:text-[#00c7fe] transition-all transform hover:translate-x-1 active:scale-95 focus:outline-none border-2 border-[#00c7fe]/30 hover:border-[#00c7fe]"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 1 }}
            >
              <ChevronRight size={20} className="sm:hidden" />
              <ChevronRight size={20} className="hidden sm:block md:hidden" />
              <ChevronRight size={28} className="hidden md:block" />
            </motion.button>

            <div className="flex justify-center items-center min-h-[360px] sm:min-h-[320px] md:min-h-[400px] perspective">
              <motion.div
                ref={carouselRef}
                className="flex justify-center items-center"
                animate={{ x: direction * -20 }}
                transition={{ duration: 0.1 }}
                onAnimationComplete={() => setDirection(0)}
              >
                <AnimatePresence mode="wait">
                  <div
                    key={activeIndex}
                    className="flex gap-0.5 justify-center items-center"
                  >
                    {getDisplayedItems().map((member, i) => (
                      <motion.div
                        key={`${member.id}-${i}`}
                        className={`flex flex-col items-center justify-center relative ${
                          member.isActive ? "z-20" : "z-10"
                        }`}
                        initial={{
                          x: direction * 80,
                          opacity: 0.5,
                          scale: 0.8,
                        }}
                        animate={{
                          scale: member.isActive
                            ? 1
                            : 0.8 -
                              Math.abs(member.offset) *
                                (getIsMobile() ? 0.08 : 0.05),
                          x:
                            member.offset *
                            (member.isActive ? 0 : getIsMobile() ? 45 : 40),
                          opacity: member.isActive
                            ? 1
                            : 1 -
                              Math.abs(member.offset) *
                                (getIsMobile() ? 0.3 : 0.15),
                          rotate:
                            direction !== 0
                              ? direction * member.offset * -2
                              : 0,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 25,
                        }}
                        whileHover={{
                          scale: member.isActive ? 1.05 : 0.85,
                          zIndex: 25,
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          member.isActive
                            ? openMemberModal(member)
                            : handleSelectMember(
                                (activeIndex + member.offset + members.length) %
                                  members.length
                              )
                        }
                      >
                        <div
                          className={`relative ${
                            member.isActive
                              ? "w-64 h-80 sm:w-48 sm:h-64 md:w-60 md:h-76"
                              : "w-32 h-44 sm:w-36 sm:h-48 md:w-44 md:h-60"
                          } rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ${
                            member.isActive &&
                            member.role &&
                            (member.role === "Designer" ||
                              member.role === "Programmer" ||
                              member.role === "DevOps")
                              ? "p-[2px] sm:p-[2px] md:p-[3px]"
                              : member.isActive
                              ? "border-0"
                              : "border-2 border-[#14111f]"
                          }`}
                        >
                          {member.isActive &&
                            member.role &&
                            (member.role === "Designer" ||
                              member.role === "Programmer" ||
                              member.role === "DevOps") && (
                              <div
                                className={`absolute inset-0 rounded-2xl z-0 ${
                                  member.role === "Designer"
                                    ? "bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500"
                                    : member.role === "Programmer"
                                    ? "bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500"
                                    : "bg-gradient-to-br from-amber-500 via-orange-500 to-red-500"
                                } opacity-90 animate-gradient-xy`}
                              ></div>
                            )}

                          <div
                            className={`relative w-full h-full bg-gradient-to-b 
    ${
      member.isActive
        ? "from-[#00c7fe]/20 via-[#0c0e21] to-[#00c7fe]/10"
        : "from-[#14111f] to-[#06050d]"
    } 
    rounded-xl z-10 overflow-hidden`}
                          >
                            <div className="w-full h-full flex items-center justify-center p-2">
                              <div
                                className={`relative w-full h-full ${
                                  member.isActive ? "scale-110" : "scale-100"
                                } transition-transform duration-300`}
                              >
                                {member.isActive && (
                                  <motion.div
                                    className="absolute top-2 left-2 bg-[#00c7fe]/90 text-black font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm z-30 shadow-[0_0_10px_rgba(0,199,254,0.5)] font-poppins"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{
                                      delay: 0.2,
                                      type: "spring",
                                      stiffness: 400,
                                    }}
                                  >
                                    {member.number}
                                  </motion.div>
                                )}

                                <div
                                  className={`relative w-full h-full ${
                                    member.isActive
                                      ? "drop-shadow-[0_0_8px_rgba(0,199,254,0.5)]"
                                      : ""
                                  }`}
                                >
                                  <div
                                    className={`w-full h-full bg-center bg-cover rounded-xl transition-all duration-500 ${
                                      member.isActive
                                        ? "filter-none"
                                        : "filter brightness-75"
                                    }`}
                                    style={{
                                      backgroundImage: `url(${member.image})`,
                                    }}
                                  />
                                </div>
                              </div>
                            </div>

                            <AnimatePresence>
                              {member.isActive && (
                                <motion.div
                                  className="absolute bottom-0 left-0 w-full bg-black/60 backdrop-blur-sm p-2 sm:p-3 md:p-4 rounded-b-xl"
                                  initial={{ y: 20, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  exit={{ y: 20, opacity: 0 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 300,
                                  }}
                                >
                                  <h3 className="text-white font-bold text-base sm:text-lg truncate font-poppins">
                                    {member.name}
                                  </h3>
                                  {member.role && (
                                    <p
                                      className={`text-xs sm:text-sm truncate font-poppins ${
                                        member.role === "Designer"
                                          ? "text-pink-400"
                                          : member.role === "Programmer"
                                          ? "text-cyan-400"
                                          : member.role === "DevOps"
                                          ? "text-orange-400"
                                          : "text-[#00c7fe]"
                                      }`}
                                    >
                                      {member.role}
                                    </p>
                                  )}
                                </motion.div>
                              )}
                            </AnimatePresence>

                            <AnimatePresence>
                              {member.isActive &&
                                member.role &&
                                !(
                                  member.role === "Designer" ||
                                  member.role === "Programmer" ||
                                  member.role === "DevOps"
                                ) && (
                                  <motion.div
                                    className="absolute inset-0 rounded-xl border border-[#00c7fe] pointer-events-none"
                                    initial={{ opacity: 0 }}
                                    animate={{
                                      opacity: [0.4, 0.6, 0.8, 1],
                                      boxShadow: [
                                        "0 0 5px rgba(0,199,254,0.3)",
                                        "0 0 10px rgba(0,199,254,0.3)",
                                        "0 0 15px rgba(0,199,254,0.3)",
                                        "0 0 20px rgba(0,199,254,0.3)",
                                      ],
                                    }}
                                    transition={{
                                      duration: 1,
                                      repeat: Infinity,
                                      repeatType: "reverse",
                                    }}
                                  />
                                )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </AnimatePresence>
              </motion.div>
            </div>

            <div
              className="absolute -bottom-6 sm:-bottom-1 left-0 right-0 mx-auto w-fit backdrop-blur-md px-4 sm:px-4 md:px-6 py-3 sm:py-2 md:py-3 rounded-lg overflow-hidden"
              style={{ maxWidth: "90%", margin: "0 auto" }}
            >
              <div className="flex items-center gap-1 sm:gap-0.5 justify-center">
                {getIsMobile() && (
                  <p className="text-white text-xs font-medium mr-2">
                    {activeIndex + 1} / {members.length}
                  </p>
                )}

                {start > 0 && (
                  <button
                    className="text-white/70 hover:text-[#00c7fe] transition-colors px-1 sm:px-0.5"
                    onClick={() => handleSelectMember(Math.max(0, start - 3))}
                  >
                    <ChevronLeft size={16} className="sm:hidden" />
                    <ChevronLeft size={14} className="hidden sm:block" />
                  </button>
                )}

                <div
                  className={`flex items-center gap-1 px-1 sm:px-2 ${
                    getIsMobile() ? "hidden" : "flex"
                  }`}
                >
                  {members.slice(start, end + 1).map((_, sliceIndex) => {
                    const index = start + sliceIndex;
                    const isActive = index === activeIndex;
                    const isNearActive = Math.abs(index - activeIndex) <= 1;

                    return (
                      <motion.button
                        key={index}
                        onClick={() => handleSelectMember(index)}
                        className="group flex items-center justify-center h-6 sm:h-7 px-0.5"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`Select member ${index + 1}`}
                      >
                        <motion.div
                          className={`h-[2px] sm:h-[3px] rounded-full transition-all ${
                            isActive
                              ? "bg-[#00c7fe] shadow-[0_0_5px_rgba(0,199,254,0.6)]"
                              : isNearActive
                              ? "bg-white/70 group-hover:bg-white"
                              : "bg-white/40 group-hover:bg-white/60"
                          }`}
                          initial={{ width: isActive ? 16 : 8 }}
                          animate={{
                            width: isActive ? 24 : 12,
                            opacity: isActive ? 1 : isNearActive ? 0.7 : 0.4,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                          }}
                        />
                      </motion.button>
                    );
                  })}
                </div>

                {end < members.length - 1 && (
                  <button
                    className="text-white/70 hover:text-[#00c7fe] transition-colors px-1 sm:px-0.5"
                    onClick={() =>
                      handleSelectMember(Math.min(members.length - 1, end + 3))
                    }
                  >
                    <ChevronRight size={16} className="sm:hidden" />
                    <ChevronRight size={14} className="hidden sm:block" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <MemberModal
          member={selectedMember}
          isOpen={isModalOpen}
          onClose={closeMemberModal}
        />
      </div>
    </div>
  );
}
