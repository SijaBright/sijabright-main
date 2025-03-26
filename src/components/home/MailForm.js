"use client";

import { useState } from "react";
import { Phone, Mail, Send } from "lucide-react";

export default function MailForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState({ status: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult({ status: "", message: "" });

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitResult({
        status: "success",
        message: "Your message has been sent! We'll get back to you soon.",
      });

      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => {
        setSubmitResult({ status: "", message: "" });
      }, 5000);
    }, 1500);
  };

  return (
    <div className="w-full py-16 bg-gradient-to-tr from-[#5e4df5] to-[#241e5d]">
      <div className="text-center py-12 px-4">
        <h2 className="text-3xl md:text-4xl font-poppins font-bold text-white mb-4">
          <span className="text-[#00c7fe]">Contact</span> & Feedback
        </h2>
        <div className="h-0.5 w-16 bg-[#00c7fe] mx-auto"></div>
      </div>

      <div className="w-[95%] max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-[#271e5f] rounded-3xl shadow-xl p-6 md:p-10">
          <div className="flex flex-col md:flex-row gap-10">
            <div className="md:w-2/5 space-y-8">
              <div>
                <h3 className="text-2xl font-poppins font-semibold text-white mb-4">
                  GET IN TOUCH WITH US
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  <span className="font-bold">Ada saran atau pertanyaan?</span>
                  Jangan ragu untuk menghubungi kami! Kami selalu terbuka untuk
                  diskusi, kolaborasi, atau sekadar berbagi ide keren seputar
                  teknologi dan komunitas kami.
                </p>
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-[#5e4df5]/30 flex items-center justify-center">
                    <Phone className="text-[#00c7fe] h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Phone</p>
                    <p className="text-white">+62 123-4567-8910</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-[#5e4df5]/30 flex items-center justify-center">
                    <Mail className="text-[#00c7fe] h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white">contact@sijabright.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-3/5">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#211a4e] border border-[#5e4df5]/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00c7fe] focus:border-transparent transition"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#211a4e] border border-[#5e4df5]/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00c7fe] focus:border-transparent transition"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full bg-[#211a4e] border border-[#5e4df5]/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00c7fe] focus:border-transparent transition resize-none"
                    placeholder="What would you like to tell us?"
                  ></textarea>
                </div>

                {submitResult.message && (
                  <div
                    className={`rounded-lg p-3 ${
                      submitResult.status === "success"
                        ? "bg-green-500/20 text-green-200"
                        : "bg-red-500/20 text-red-200"
                    }`}
                  >
                    {submitResult.message}
                  </div>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#5e4df5] hover:bg-[#4c3fd6] text-white font-medium py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Send className="h-4 w-4 mr-2" />
                        <span>Send Message</span>
                      </div>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
