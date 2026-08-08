import "./globals.css";
import { StoreProvider } from "@/lib/store";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Announcement from "@/components/Announcement";
import BackToTop from "@/components/BackToTop";
import Cursor from "@/components/Cursor";
import Grain from "@/components/Grain";
import Preloader from "@/components/Preloader";

export const metadata = {
  title: "TRENDING KAPDE WALA — Modern Fashion",
  description:
    "Trending Kapde Wala. Minimal black & white fashion. Shop the latest drops in womenswear, menswear and accessories.",
};

export const viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-paper text-ink">
        <StoreProvider>
          <Preloader />
          <Grain />
          <Cursor />
          <Announcement />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <BackToTop />
        </StoreProvider>
      </body>
    </html>
  );
}
