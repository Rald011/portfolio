import { Syne, Public_Sans } from "next/font/google";
import "./globals.css";

const display = Syne({
  subsets: ["latin"],
  variable: "--font-display",
});

const body = Public_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata = {
  title: "Jerald James Patiag",
  description:
    "Portfolio of Jerald James Patiag, an Information Technology student in Davao City.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0d3b3f",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
