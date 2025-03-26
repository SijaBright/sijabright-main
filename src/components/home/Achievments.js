"use client";

export default function Achievements() {
return (
    <div className="w-[95%] max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center space-y-8">
            <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-poppins font-bold text-white">
                    <span className="text-[#00c7fe]">Achievements</span> - Our Milestones
                </h2>
                <div className="h-0.5 w-16 bg-[#00c7fe] mx-auto"></div>
            </div>

            <div className="max-w-3xl mx-auto">
                <p className="text-lg font-poppins text-gray-300 leading-relaxed">
                    &ldquo;Setiap usaha punya hasil, dan ini adalah bukti nyata dari kerja keras kami. From competitions to certifications, here&apos;s what we&apos;ve accomplished. Because progress is meant to be celebrated.&rdquo;
                </p>
            </div>

            <div className="mt-16 bg-[#0f1126] rounded-3xl shadow-lg p-8 md:p-12 w-full max-w-2xl mx-auto">
                <div className="flex flex-col items-center space-y-6">
                    <div className="relative">
                        <div className="animate-ping absolute h-16 w-16 rounded-full bg-[#00c7fe]/30"></div>
                        <div className="h-16 w-16 rounded-full bg-[#00c7fe]/80 flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                                />
                            </svg>
                        </div>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-poppins font-bold text-white">
                        Coming Soon
                    </h3>

                    <p className="text-gray-300 text-center">
                        We&apos;re compiling our achievements and success stories.
                        <br />
                        Check back soon to see our accomplishments!
                    </p>
                </div>
            </div>
        </div>
    </div>
);
}
