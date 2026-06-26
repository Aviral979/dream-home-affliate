import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const poppins = Poppins({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata = {
  title: "Dream Home Designes — Budget-Friendly Room Transformations",
  description:
    "Khaali kamra se dream room tak. Sage, coastal, minimalist room ideas — sab budget-friendly. Shop curated home decor picks for Indian homes.",
  openGraph: {
    title: "Dream Home Designes",
    description: "Budget-friendly room transformations for Indian homes.",
    images: ["/8.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dream Home Designes",
    description: "Budget-friendly room transformations for Indian homes.",
    images: ["/8.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
