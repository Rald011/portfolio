import { Manrope, Public_Sans } from "next/font/google";
import Sidebar from "./Sidebar";
import { profile } from "./data";
import "./globals.css";

const display = Manrope({
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
  openGraph: {
    title: "Jerald James Patiag",
    description:
      "Portfolio of Jerald James Patiag, an Information Technology student in Davao City.",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0a0a0a",
};

const themeScript = `(function(){var t="dark";try{var s=localStorage.getItem("theme");if(s==="light"||s==="dark")t=s}catch(e){}document.documentElement.dataset.theme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",t==="light"?"#fafafa":"#0a0a0a")})();`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip" href="#top">
          Skip to content
        </a>
        <div className="shell">
          <Sidebar
            name={profile.name}
            shortName={profile.shortName}
            role={profile.role}
            timezone={profile.timezone}
            city={profile.city}
          />
          {children}
        </div>
      </body>
    </html>
  );
}
