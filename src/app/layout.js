import { Geist, Geist_Mono } from "next/font/google";
import { Poppins } from "next/font/google";
import "../styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "SIJA BRIGHT - Kelas SIJA B Angkatan 27",
    template: "%s | SIJA BRIGHT"
  },
  description: "Website resmi kelas SIJA B, tempat berbagi ilmu, proyek, dan kenangan bersama.",
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://sijabright-dev.rejaka.me/',
    siteName: 'SIJA BRIGHT',
    images: [
      {
        url: '/assets/images/sijabright-og.jpg',
        width: 1200,
        height: 630,
        alt: 'SIJA BRIGHT',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@sijabright',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased bg-[#0a0a0f] min-h-screen overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}