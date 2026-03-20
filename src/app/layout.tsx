import type { Metadata } from "next";
import "./globals.css";

// TASK 2 — Root metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://realenterprises.pk"),
  title: {
    default: "Real Enterprises | Premium Construction Company Lahore",
    template: "%s | Real Enterprises",
  },
  description:
    "Real Enterprises — 25+ years of residential, commercial, and interior construction excellence across Pakistan. Based in Lahore.",
  keywords: [
    "construction company Lahore",
    "house construction DHA Lahore",
    "commercial construction Lahore",
    "building contractor Gulberg",
    "grey structure Lahore",
    "turnkey construction Pakistan",
    "interior design Lahore",
  ],
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "https://realenterprises.pk",
    siteName: "Real Enterprises",
    title: "Real Enterprises | Premium Construction Company Lahore",
    description:
      "25+ years of delivering residential, commercial & interior construction projects across Pakistan.",
    images: [
      {
        url: "/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Real Enterprises — Construction Excellence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Enterprises | Premium Construction Company Lahore",
    description:
      "25+ years of delivering residential, commercial & interior construction projects across Pakistan.",
    images: ["/assets/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body id="site-top" className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
