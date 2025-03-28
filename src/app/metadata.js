export async function generateMetadata() {
    return {
      title: "HOME | SIJABRIGHT",
      description:
        "Website resmi SIJA BRIGHT - Kelas SIJA B Angkatan 27 STEMBAYO",
      openGraph: {
        images: [
          {
            url: "/assets/images/hero-og.jpg",
            width: 1200,
            height: 630,
            alt: "SIJA BRIGHT Home",
          },
        ],
      },
    };
  }