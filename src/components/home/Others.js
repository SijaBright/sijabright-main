"use client";

export default function Others() {
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
                    Koding dan networking emang seru, tapi ada yang lebih dari itu! Di sini, kamu bisa main game, akses tools penting, atau gabung komunitas buat diskusi seru. Everything in one place, tinggal pilih dan ekspor lebih jauh!
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
                                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                />
                            </svg>
                        </div>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-poppins font-bold text-white">
                        Coming Soon
                    </h3>

                    <p className="text-gray-300 text-center">
                        We&apos;re preparing helpful resources and content.
                        <br />
                        Check back soon to access these valuable materials!
                    </p>
                </div>
            </div>
        </div>
    </div>
);
}
